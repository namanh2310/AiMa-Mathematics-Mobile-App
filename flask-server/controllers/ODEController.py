from flask import request, jsonify
import numpy as np
from sympy import *

class ODEController:
    def eulerMethod():
      if request.method == "POST":
        data = request.json['input']
        function = data["function"]
        xi = float(data["xi"])
        y = float(data["y"])
        xf = float(data["xf"])
        n = float(data["h"])
        
        try:
        #   if (function == ""):
        #     return error_handling(400)
            functionReplace = function.replace("^", "**")
            y = Symbol("y")

            def functionInput(x, y):
              # functionReplace = function.replace("^", "**")
              return eval(functionReplace)
            
            def intFunction(x, y):
              integratedFunction = integrate(functionReplace)
              return eval(str(integratedFunction))

            def showFunctionInput():
              functionReplace = function.replace("^", "**")
              return str(functionReplace)
            
            def showIntFunctionInput():
              return str(integrate(functionReplace))

            def calFunctionInput(x_input, y_input):
              return functionInput(x_input, y_input)
            
            def calIntFunction(x_input, y_input):
              return intFunction(x_input, y_input)
            
            obj = []

            def euler(xi, y, xf, n):
              h = int(abs(xi - xf) / n + 1)
              array = np.linspace(xi, xf, h)
              slope = calFunctionInput(xi, y)
              c_constant = y - calIntFunction(xi, y)
              for i in range(len(array)):
                if i == 0:
                  obj.append({
                    "iterator": 0,
                    "x": array[i],
                    "y_euler": '{:.4f}'.format(y),
                    "slope": '{:.4f}'.format(slope),
                    "y_true": '{:.4f}'.format(y),
                  })
                else:
                  y_next = y + (slope * n)
                  y_true = calIntFunction(array[i], y) + c_constant
                  slope = calFunctionInput(array[i], y)
                  y = y_next
                  obj.append({
                    "iterator": i,
                    "x": array[i],
                    "y_euler": '{:.4f}'.format(y),
                    "slope": '{:.4f}'.format(slope),
                    "y_true": '{:.4f}'.format(y_true),
                  })
              return jsonify({
                "equation": showFunctionInput().replace('**','^'),
                "intEquation": showIntFunctionInput().replace('**','^'),
                "c_constant": c_constant,
                "step_size": h,
                "data": obj,
              })
            return euler(xi, y, xf, n)
        except:
          return 'error_handling(500)'
        
    def midPointMethod():
      if request.method == "POST":
        data = request.json['input']
        function = data["function"]
        xi = float(data["xi"])
        y = float(data["y"])
        xf = float(data["xf"])
        n = float(data["h"])
        try:
            functionReplace = function.replace("^", "**")

            def functionInput(x, y):
              return eval(functionReplace)
            
            def showFunctionInput():
              return str(functionReplace)
            
            def calFunctionInput(x_input, y_input):
              return functionInput(x_input, y_input)    
            
            obj = []

            def midPoint(xi, xf, n, y):
              
              h = int(abs(xi - xf) / n + 1)
              array = np.linspace(xi, xf, h) 
              slope = calFunctionInput(xi, y)
              slope2 = calFunctionInput(xi+(n/2), y+((slope*n)/2))
              y_next = y + slope2*n

              for i in range(len(array)):
                if i == 0:
                  obj.append({
                    "iterator": 0,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),  
                    "y_midpoint": '{:.4f}'.format(y),
                  })
                else:
                  y = y_next
                  slope = calFunctionInput(array[i], y)
                  slope2 = calFunctionInput(array[i]+(n/2), y+((slope*n)/2))
                  y_next = y + slope2*n
                  obj.append({
                    "iterator": i,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "y_midpoint": '{:.4f}'.format(y),
                  })
              return jsonify({
                    "data": obj,
                  })
            return midPoint(xi, xf, n, y)
        except ValueError:
            return ValueError
        
    def heunMethod():
      if request.method == "POST":
        data = request.json['input']
        function = data["function"]
        xi = float(data["xi"])
        y = float(data["y"])
        xf = float(data["xf"])
        n = float(data["h"])
        try:
            functionReplace = function.replace("^", "**")

            def functionInput(x, y):
              return eval(functionReplace)
            
            x_c = Symbol('x')

            def intFunction(x, y):
              integratedFunction = integrate(function, x_c)
              return eval(str(integratedFunction))
            
            def showFunctionInput():
              return str(functionReplace)
            
            def showIntFunctionInput():
              return str(integrate(functionReplace, x_c))
            
            def calFunctionInput(x_input, y_input):
              return functionInput(x_input, y_input)
            
            def calIntFunction(x_input, y_input):
              return intFunction(x_input, y_input)
            
            obj = []

            def Heun(xi, xf, n, y):
              
              h = int(abs(xi - xf) / n + 1)
              array = np.linspace(xi, xf, h) 
              slope = calFunctionInput(xi, y)
              y0 = y + slope*n
              slope2 = calFunctionInput(xi+n, y0)
              y_next = y + ((slope+slope2)/2)*n
              for i in range(len(array)):
                if i == 0:
                  obj.append({
                    "iterator": 0,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "y_heun": '{:.4f}'.format(y),
                    # "y_true": '{:.4f}'.format(y),
                  })
                else:
                  y = y_next
                  y_true = calIntFunction(array[i], y)
                  slope = calFunctionInput(array[i], y)
                  y0 = y + slope*n
                  slope2 = calFunctionInput(array[i]+n, y0)
                  y_next = y + ((slope + slope2)/2)*n
                  obj.append({
                    "iterator": i,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "y_heun": '{:.4f}'.format(y),
                    # "y_true": '{:.4f}'.format(y_true),
                  })
              return jsonify({
                    "data": obj,
                  })
            return Heun(xi, xf, n, y)
        except ValueError:
            return ValueError

    def ralstonMethod():
      if request.method == "POST":
        data = request.json['input']
        function = data["function"]
        xi = float(data["xi"])
        y = float(data["y"])
        xf = float(data["xf"])
        n = float(data["h"])
        try:
            functionReplace = function.replace("^", "**")

            def functionInput(x, y):
              return eval(functionReplace)
            
            def showFunctionInput():
              return str(functionReplace)
            
            def calFunctionInput(x_input, y_input):
              return functionInput(x_input, y_input)
            
            obj = []

            def Ralston(xi, xf, n, y):
              h = int(abs(xi - xf) / n + 1)
              array = np.linspace(xi, xf, h) 
              slope = calFunctionInput(xi, y)
              slope2 = calFunctionInput(xi+(3*n/4), y+((3*slope*n)/4))
              y_next = y + ((1/3)*slope+(2/3)*slope2)*n
              for i in range(len(array)):
                if i == 0:
                  obj.append({
                    "iterator": 0,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "y_ralston": '{:.4f}'.format(y),
                    # "y_true": '{:.4f}'.format(y),
                  })
                else:
                  y = y_next
                  slope = calFunctionInput(array[i], y)
                  slope2 = calFunctionInput(array[i]+(3*n/4), y+((3*slope*n)/4))
                  y_next = y + ((1/3)*slope+(2/3)*slope2)*n
                  obj.append({
                    "iterator": i,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "y_ralston": '{:.4f}'.format(y),
                  })
              return jsonify({
                    "data": obj,
                  })
            return Ralston(xi, xf, n, y)
        except ValueError:
            return ValueError
        
    def thirdOrderMethod():
      if request.method == "POST":
        data = request.json['input']
        function = data["function"]
        xi = float(data["xi"])
        y = float(data["y"])
        xf = float(data["xf"])
        n = float(data["h"])
        try:
            functionReplace = function.replace("^", "**")

            def functionInput(x, y):
              return eval(functionReplace)
            
            def showFunctionInput():
              return str(functionReplace)
            
            def calFunctionInput(x_input, y_input):
              return functionInput(x_input, y_input)
            
            obj = []

            def thirdOrder(xi, xf, n, y):
              h = int(abs(xi - xf) / n + 1)
              array = np.linspace(xi, xf, h) 
              slope = calFunctionInput(xi, y)
              slope2 = calFunctionInput(xi+(1*n/2), y+((1*slope*n)/2))
              slope3 = calFunctionInput(xi+n, y-slope*n+2*slope2*n)
              y_next = y + 1/6*(slope+4*slope2+slope3)*n
              for i in range(len(array)):
                if i == 0:
                  obj.append({
                    "iterator": 0,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "slope3": '{:.4f}'.format(slope3),
                    "y_3rd": '{:.4f}'.format(y),
                  })
                else:
                  y = y_next
                  slope = calFunctionInput(array[i], y)
                  slope2 = calFunctionInput(xi+(1*n/2), y+((1*slope*n)/2))
                  slope3 = calFunctionInput(array[i]+n, y-slope*n+2*slope2*n)
                  y_next = y + 1/6*(slope+4*slope2+slope3)*n
                  obj.append({
                    "iterator": i,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "slope3": '{:.4f}'.format(slope3),
                    "y_3rd": '{:.4f}'.format(y),
                  })
              return jsonify({
                    "data": obj,
                  })
            return thirdOrder(xi, xf, n, y)
        except ValueError:
            return ValueError
        
    def fourthOrderMethod():
      if request.method == "POST":
        data = request.json['input']
        function = data["function"]
        xi = float(data["xi"])
        y = float(data["y"])
        xf = float(data["xf"])
        n = float(data["h"])
        try:
            functionReplace = function.replace("^", "**")

            def functionInput(x, y):
              return eval(functionReplace)
            
            def showFunctionInput():
              return str(functionReplace)
            
            def calFunctionInput(x_input, y_input):
              return functionInput(x_input, y_input)
            
            obj = []

            def fourthOrder(xi, xf, n, y):
              h = int(abs(xi - xf) / n + 1)
              array = np.linspace(xi, xf, h) 
              slope = calFunctionInput(xi, y)
              slope2 = calFunctionInput(xi+(1*n/2), y+((1*slope*n)/2))
              slope3 = calFunctionInput(xi+(1*n/2), y+((1*slope2*n)/2))
              slope4 = calFunctionInput(xi+n, y+n*slope3)
              y_next = y + ((1*slope/6)+(1*slope2/3)+(1*slope3/3)+(1*slope4/6))*n
              for i in range(len(array)):
                if i == 0:
                  obj.append({
                    "iterator": 0,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "slope3": '{:.4f}'.format(slope3),
                    "slope4": '{:.4f}'.format(slope4),
                    "y_4th": '{:.4f}'.format(y),
                  })
                else:
                  y = y_next
                  slope = calFunctionInput(xi, y)
                  slope2 = calFunctionInput(xi+(1*n/2), y+((1*slope*n)/2))
                  slope3 = calFunctionInput(xi+(1*n/2), y+((1*slope2*n)/2))
                  slope4 = calFunctionInput(xi+n, y+n*slope3)
                  y_next = y + ((1*slope/6)+(1*slope2/3)+(1*slope3/3)+(1*slope4/6))*n
                  obj.append({
                    "iterator": i,
                    "x": array[i],
                    "slope": '{:.4f}'.format(slope),
                    "slope2": '{:.4f}'.format(slope2),
                    "slope3": '{:.4f}'.format(slope3),
                    "slope4": '{:.4f}'.format(slope4),
                    "y_4th": '{:.4f}'.format(y),
                  })
              return jsonify({
                    "data": obj,
                  })
            return fourthOrder(xi, xf, n, y)
        except ValueError:
            return ValueError
        
    def simpson13Rule():
      if request.method == "POST":
        data = request.json['input']
        function = data["function"]
        a = float(data["a"])
        b = float(data["b"])
        
        n = (b-a)/2
        try:
            x = Symbol('x')
            functionReplace = function.replace("^", "**")
            intFunction = integrate(functionReplace, x)
            print(intFunction)

            def functionInput(x, y):
              return eval(functionReplace)
            
            def calFunctionInput(x_input, y_input):
              return functionInput(x_input, y_input)
            
            def integrated_function(f, a, b):
              return integrate(f, (x, a, b))
            
            obj = []

            def simpson13(a, b ,n):
              I = (n/3)*(calFunctionInput(a, 0)+ 4*calFunctionInput(n, 0)+ calFunctionInput(b, 0))
              true_value = integrated_function(function, a, b) 
              error = ((true_value - I)/true_value)*100
              obj.append({
                "I": '{:.4f}'.format(I),
                "true_value": '{:.4f}'.format(true_value),
                "error": '{:.4f}'.format(error),
              })
              return jsonify({
                    "data": obj,
                    "intFunct": str(intFunction),
                    "n": n
                  })
            return simpson13(a, b, n)
        except ValueError:
            return ValueError