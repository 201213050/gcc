
class logica{
	
	constructor(){

		this.operar=function(raiz){
			var resultado1=null;
			var resultado2=null;

			switch(raiz.etiqueta){
				case "+":
				case "-":
				case "*":
				case "/":
				case "%":
				case "^":
					opR=new relacional();
					return opR.operar(raiz);
					break;
				case "==":
            	case "!=":
            	case ">":
            	case ">=":
            	case "<":
            	case "<=":
            		opR=new relacional();
					return opR.operar(raiz);
            		break;
            	case "&&":
            		
            		resultado1=this.operar(raiz.hijos[0]);
            		codigo3D+=resultado1.etiV+":\n";
            		resultado2=this.operar(raiz.hijos[1]);

            		return new resultado("bool",0,false,resultado2.etiV,resultado1.etiF+","+resultado2.etiF);
            		break;
            	case "&?":
            		resultado1=this.operar(raiz.hijos[0]);
            		codigo3D+=resultado1.etiV+":\n";
            		resultado2=this.operar(raiz.hijos[1]);

            		return new resultado("bool",0,false,resultado1.etiF+","+resultado2.etiF,resultado2.etiV);
            		break;
            	case "||":
            		resultado1=this.operar(raiz.hijos[0]);
            		codigo3D+=resultado1.etiF+":\n";
            		resultado2=this.operar(raiz.hijos[1]);

            		return new resultado("bool",0,false,resultado1.etiV+","+resultado2.etiV,resultado2.etiF);
            		break;
            	case "|?":
            		resultado1=this.operar(raiz.hijos[0]);
            		codigo3D+=resultado1.etiF+":\n";
            		resultado2=this.operar(raiz.hijos[1]);

            		return new resultado("bool",0,false,resultado2.etiF,resultado1.etiV+","+resultado2.etiV);
            		break;
            	case "|&":
            		resultado1=this.operar(raiz.hijos[0]);
            		codigo3D+=resultado1.etiV+":\n";
            		resultado2=this.operar(raiz.hijos[1]);
            		codigo3D+=resultado1.etiF+":\n";
            		var resultado3=this.operar(raiz.hijos[1]);

            		return new resultado("bool",0,false,resultado2.etiF+","+resultado3.etiV,resultado2.etiV+","+resultado3.etiF);
            		break;
            	case "!":
            		resultado1=this.operar(raiz.hijos[0]);
            		return new resultado("bool",0,false,resultado1.etiF,resultado1.etiV);
            		break;
            	default:
            		opR=new relacional();
            		return opR.operar(raiz);
            		break;
			}


			return new resultado(-1,null);
		}



	}
}