from latex2sympy2 import latex2sympy, latex2latex
from flask import request, jsonify
from sympy import *
import re

class CalculusController: 
    def fundamental():
        if request.method == "POST":
            temp_symbol = '###'
            step = []
            data = request.json['data']
            raw_data = repr(data)
            expr = sympify(raw_data)
            sympy_converter = latex2sympy(expr)
            print(sympy_converter)
            pattern = r"\b\w+\(([^,]+)"
            pattern_exception = r'\([^,]+,\s*[^,]+,\s*[^)]+\)'
            x = Symbol('x')
            if '=' not in expr:
                for arg in sympy_converter.args:
                        if len(sympy_converter.args) == 2:
                            match = re.match(pattern_exception, str(sympy_converter.args[1]))  
                            if match:
                                try:
                                    result = integrate(arg, x)
                                    conclu = sympify(sympy_converter).doit()
                                    step.append([str(arg).replace('**', temp_symbol).replace('*x', 'x').replace(temp_symbol, '^'), 
                                            str(result).replace('**', temp_symbol).replace('*', '').replace(temp_symbol, '^'),
                                            str(conclu).replace('**', temp_symbol).replace('*', '').replace(temp_symbol, '^')
                                            ])
                                    print(step[0])
                                    break
                                except:
                                    break
                            else:
                                if 'Integral' in str(arg):
                                    matches = re.findall(pattern, str(arg))
                                    for match in matches:
                                        result = integrate(match, x)
                                        conclu = sympify(arg).doit()
                                        step.append([match.replace('**', temp_symbol).replace('*x', 'x').replace(temp_symbol, '^'), 
                                            str(result).replace('**', temp_symbol).replace('*', '').replace(temp_symbol, '^'),
                                            str(conclu).replace('**', temp_symbol).replace('*', '').replace(temp_symbol, '^')
                                            ])
                        else:
                            if 'Integral' in str(arg):
                                matches = re.findall(pattern, str(arg))
                                for match in matches:
                                    result = integrate(match, x)
                                    conclu = sympify(arg).doit()
                                    step.append([match.replace('**', temp_symbol).replace('*x', 'x').replace(temp_symbol, '^'), 
                                            str(result).replace('**', temp_symbol).replace('*', '').replace(temp_symbol, '^'),
                                            str(conclu).replace('**', temp_symbol).replace('*', '').replace(temp_symbol, '^')
                                            ])
            
                
        return jsonify({'equation': data, 'result': latex2latex(expr), 'step': step})
    
  
       
    