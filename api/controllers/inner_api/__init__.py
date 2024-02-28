from flask import Blueprint
from libs.external_api import ExternalApi

bp = Blueprint('inner_api', __name__, url_prefix='/inner/api')
api = ExternalApi(bp)

from . import authorization, model_runtime, app, service