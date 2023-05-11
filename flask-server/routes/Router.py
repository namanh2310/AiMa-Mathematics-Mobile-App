from routes.Optimize import Optimize
from routes.Calculus import Calculus
from routes.ODE import ODE

class Router:
  def run(app):
    app.register_blueprint(Optimize, url_prefix='/Optimize')
    app.register_blueprint(Calculus, url_prefix='/Calculus')
    app.register_blueprint(ODE, url_prefix='/ODE')