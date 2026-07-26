import os
import torch
import torch.nn as nn
import logging
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[3]

logger = logging.getLogger(__name__)

class TransformerBehavioralModel(nn.Module):
    def __init__(
        self,
        input_dim=49,
        d_model=64,
        nhead=4,
        num_layers=2,
        dropout=0.2
    ):
        super(TransformerBehavioralModel, self).__init__()
        
        self.embedding = nn.Linear(
            input_dim,
            d_model
        )

        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model,
            nhead=nhead,
            dim_feedforward=256,
            dropout=dropout,
            activation="gelu",
            batch_first=True
        )

        self.transformer = nn.TransformerEncoder(
            encoder_layer,
            num_layers=num_layers
        )

        self.classifier = nn.Sequential(
            nn.Linear(d_model,64),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(64,1)
        )

    def forward(self, x):
        x = self.embedding(x)
        x = self.transformer(x)
        x = x.mean(dim=1)
        x = self.classifier(x)
        return x


class TransformerLoader:
    def __init__(self, model_path=None):
        if model_path is None:
            self.model_path = (
                PROJECT_ROOT /
                "models" /
                "trained" /
                "transformers" /
                "best_transformer_model.pth"
            )
        else:
            self.model_path = Path(model_path)
            
        print(f"Loading Transformer from:\n{self.model_path}")
        self.model = None
        self.is_mock = False
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self._load_model()

    def _load_model(self):
        self.model = TransformerBehavioralModel(
            input_dim=49,
            d_model=64,
            nhead=4,
            num_layers=2,
            dropout=0.2
        )
        
        if os.path.exists(self.model_path):
            try:
                self.model.load_state_dict(torch.load(self.model_path, map_location=self.device))
                logger.info("Transformer loaded successfully.")
            except Exception as e:
                logger.error(f"Failed to load Transformer from {self.model_path}: {e}")
                self._initialize_mock()
        else:
            logger.warning("WARNING: Real model not found. Using mock model for development.")
            self._initialize_mock()
            
        self.model.to(self.device)
        self.model.eval()

    def _initialize_mock(self):
        self.is_mock = True
        # Model is already initialized with random weights, which serves perfectly as a mock for API testing
        pass

    def predict_proba(self, X: torch.Tensor) -> float:
        # X should be (batch_size, seq_len, features)
        with torch.no_grad():
            X = X.to(self.device)
            output = self.model(X)
            # Return the float probability for the first item in batch
            return output.item()
