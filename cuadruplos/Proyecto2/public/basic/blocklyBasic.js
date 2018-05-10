var workspace=null;
  //window.addEventListener('load',inicializarBlockly, false);
function blocklyBasic(){
  
  workspace = Blockly.inject('workspaceBasic',
    {toolbox: document.getElementById('toolboxBasic'),
     zoom:
         {controls: true,
          wheel: true,
          startScale: 0.8,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2},
     trashcan: true});
  workspace.addChangeListener(listenerBlocklyBasic);

}


function listenerBlocklyBasic(event) {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  codigoAltoNivel=code;
  var raiz=gramaticaHard3D.parse(code);
  compilador=new compiladorBasic(raiz);
  compilador.iniciar(raiz);
  document.getElementById('txtCodigoBasic3D').value = codigo3D;
  
  //document.getElementById('txtCodigoBasic3D').value = code;


}


Blockly.Blocks['bloqueloop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("loop")
        .appendField(new Blockly.FieldTextInput("loop1"), "nombreLoop")
        .appendField("{");
    this.appendStatementInput("cuerpoLoop")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('ciclo loop');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloqueloop'] = function(block) {
  var text_nombreloop = block.getFieldValue('nombreLoop');
  var statements_cuerpoloop = Blockly.JavaScript.statementToCode(block, 'cuerpoLoop');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return "loop "+text_nombreloop+"{\n"+statements_cuerpoloop+"}\n";
};



Blockly.Blocks['bloqueshow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("show(");
    this.appendValueInput("txtShow")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(");");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('show');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloqueshow'] = function(block) {
  var value_txtshow = Blockly.JavaScript.valueToCode(block, 'txtShow', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "show("+value_txtshow+");\n";
  return code;
};


Blockly.Blocks['bloqueoperaciones'] = {
  init: function() {
    this.appendValueInput("valorIzquierdo")
        .setCheck(null);
    this.appendDummyInput();
    this.appendValueInput("valorDerecho")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["+","+"], ["-","-"], ["*","*"], ["/","/"], ["%","%"], ["^","^"]]), "operadores");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(180);
    this.setTooltip('operaciones');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloqueoperaciones'] = function(block) {
  var value_valorizquierdo = Blockly.JavaScript.valueToCode(block, 'valorIzquierdo', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operadores = block.getFieldValue('operadores');
  var value_valorderecho = Blockly.JavaScript.valueToCode(block, 'valorDerecho', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.

  var code = value_valorizquierdo+dropdown_operadores+value_valorderecho;
  

  code=code.replace("(","");
  code=code.replace(")","");


  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['bloquegetbool'] = {
  init: function() {
    this.appendValueInput("parametro")
        .setCheck("String")
        .appendField("getBool(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour(75);
    this.setTooltip('casteo explicito ');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloquegetbool'] = function(block) {
  var value_parametro = Blockly.JavaScript.valueToCode(block, 'parametro', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "getBool("+value_parametro+")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.Blocks['bloqueoutstr'] = {
  init: function() {
    this.appendValueInput("outStr")
        .setCheck(null)
        .appendField("outStr(");
    this.appendDummyInput()
        .appendField(");");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip('outStr');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloqueoutstr'] = function(block) {
  var value_outstr = Blockly.JavaScript.valueToCode(block, 'outStr', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code ="outStr("+value_outstr+");\n";
  return code;
};


Blockly.Blocks['bloqueoutnum'] = {
  init: function() {
    this.appendValueInput("outNum")
        .setCheck("Number")
        .appendField("outNum(");
    this.appendDummyInput()
        .appendField(",")
        .appendField(new Blockly.FieldDropdown([["true","true"], ["false","false"]]), "tipo")
        .appendField(");");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('outNum');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloqueoutnum'] = function(block) {
  var value_outnum = Blockly.JavaScript.valueToCode(block, 'outNum', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_tipo = block.getFieldValue('tipo');
  // TODO: Assemble JavaScript into code variable.
  var code ="outNum("+value_outnum+","+dropdown_tipo+");\n";
  return code;
};



Blockly.Blocks['bloqueinstr'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("inStr(");
    this.appendValueInput("variable")
        .setCheck(["variables", "String"])
        .appendField(new Blockly.FieldTextInput("variable"), "variable")
        .appendField(",");
    this.appendDummyInput()
        .appendField(");");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('inStr');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloqueinstr'] = function(block) {
  var text_variable = block.getFieldValue('variable');
  var value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code ="inStr("+text_variable+","+value_variable+");\n";
  return code;
};



Blockly.Blocks['bloqueinnum'] = {
  init: function() {
    this.appendValueInput("mensaje")
        .setCheck(null)
        .appendField("inNum(");
    this.appendValueInput("defecto")
        .setCheck("Number")
        .appendField(",");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(285);
    this.setTooltip('inNum');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloqueinnum'] = function(block) {
  var value_mensaje = Blockly.JavaScript.valueToCode(block, 'mensaje', Blockly.JavaScript.ORDER_ATOMIC);
  var value_defecto = Blockly.JavaScript.valueToCode(block, 'defecto', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code ="inNum("+value_mensaje+","+value_defecto+")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['bloquegetrandom'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("getRandom()");
    this.setOutput(true, "Number");
    this.setColour(120);
    this.setTooltip('getRandom');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloquegetrandom'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code ="getRandom()";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['bloquegetarrlength'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("getLength(")
        .appendField(new Blockly.FieldTextInput("array"), "array")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0), "dimension")
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(75);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['bloquegetarrlength'] = function(block) {
  var text_array = block.getFieldValue('array');
  var number_dimension = block.getFieldValue('dimension');
  // TODO: Assemble JavaScript into code variable.
  var code ="getLength("+text_array+","+number_dimension+")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['bloquegetcadlength'] = {
  init: function() {
    this.appendValueInput("cadena")
        .setCheck(null)
        .appendField("getLength(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.JavaScript['bloquegetcadlength'] = function(block) {
  var value_cadena = Blockly.JavaScript.valueToCode(block, 'cadena', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code ="getLength("+value_cadena+")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.Blocks['bloquegetnum'] = {
  init: function() {
    this.appendValueInput("strValor")
        .setCheck(null)
        .appendField("getNum(");
    this.appendValueInput("strBase")
        .setCheck(null)
        .appendField(",");
    this.appendValueInput("defecto")
        .setCheck(null)
        .appendField(",");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(285);
    this.setTooltip('getNum');
    this.setHelpUrl('#!/');
  }
};



Blockly.JavaScript['bloquegetnum'] = function(block) {
  var value_strvalor = Blockly.JavaScript.valueToCode(block, 'strValor', Blockly.JavaScript.ORDER_ATOMIC);
  var value_strbase = Blockly.JavaScript.valueToCode(block, 'strBase', Blockly.JavaScript.ORDER_ATOMIC);
  var value_defecto = Blockly.JavaScript.valueToCode(block, 'defecto', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code ="getNum("+value_strvalor+","+value_strbase+","+value_defecto+")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['bloquecrearvariableprimitiva'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["num","num"], ["str","str"], ["bool","bool"]]), "tipo")
        .appendField(new Blockly.FieldTextInput("variable"), "nombre")
        .appendField(";");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(105);
    this.setTooltip('variable');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloquecrearvariableprimitiva'] = function(block) {
  var dropdown_tipo = block.getFieldValue('tipo');
  var text_nombre = block.getFieldValue('nombre');
  // TODO: Assemble JavaScript into code variable.
  var code =dropdown_tipo+" "+text_nombre+";\n";
  return code;
};



Blockly.Blocks['bloqueasignarvariableprimitiva'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("variable"), "variable")
        .appendField("=");
    this.appendValueInput("valor")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(";");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('asignar variable');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloqueasignarvariableprimitiva'] = function(block) {
  var text_variable = block.getFieldValue('variable');
  var value_valor = Blockly.JavaScript.valueToCode(block, 'valor', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  value_valor=value_valor.replace("(","");
  value_valor=value_valor.replace(")","");


  var code =text_variable+"="+value_valor+";\n";
  return code;
};


Blockly.Blocks['bloquevariable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("variable"), "nombe");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(285);
    this.setTooltip('variable');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloquevariable'] = function(block) {
  var text_nombre = block.getFieldValue('nombe');
  // TODO: Assemble JavaScript into code variable.
  var code = text_nombre;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.Blocks['bloqueif'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField("if(");
    this.appendDummyInput()
        .appendField(") then {");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('if');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloqueif'] = function(block) {
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  var code ="if("+value_condicion+") then {\n"+statements_cuerpo+"}\n";
  return code;
};




Blockly.Blocks['bloqueelse'] = {
  init: function() {
    this.appendStatementInput("cuerpo")
        .setCheck(null)
        .appendField("else{");
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true, "bloqueif");
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('else');
    this.setHelpUrl('#!/');
  }
};



Blockly.JavaScript['bloqueelse'] = function(block) {
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  var code ="else{\n"+statements_cuerpo+"}\n";
  return code;
};





Blockly.Blocks['bloqueswitch'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField("switch{");
    this.appendDummyInput()
        .appendField(",")
        .appendField(new Blockly.FieldDropdown([["true","true"], ["false","false"]]), "modo")
        .appendField("){");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('switch');
    this.setHelpUrl('#!/');
  }
};



Blockly.JavaScript['bloqueswitch'] = function(block) {
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_modo = block.getFieldValue('modo');
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  var code ="switch("+value_condicion+","+dropdown_modo+"){\n"+statements_cuerpo+"}\n";
  return code;
};



Blockly.Blocks['bloquecase1'] = {
  init: function() {
    this.appendValueInput("valor")
        .setCheck(["Number", "String", "Boolean"])
        .appendField("case");
    this.appendDummyInput()
        .appendField(":");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('case');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloquecase1'] = function(block) {
  var value_valor = Blockly.JavaScript.valueToCode(block, 'valor', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  var code ="case "+value_valor+" :\n"+statements_cuerpo+"";
  return code;
};


Blockly.Blocks['bloquecase2'] = {
  init: function() {
    this.appendValueInput("valorInferior")
        .setCheck(["Number", "String", "Boolean"])
        .appendField("case");
    this.appendValueInput("valorSuperior")
        .setCheck(["Number", "String", "Boolean"])
        .appendField("-");
    this.appendDummyInput()
        .appendField(":");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
    this.setTooltip('case');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloquecase2'] = function(block) {
  var value_valorinferior = Blockly.JavaScript.valueToCode(block, 'valorInferior', Blockly.JavaScript.ORDER_ATOMIC);
  var value_valorsuperior = Blockly.JavaScript.valueToCode(block, 'valorSuperior', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  var code ="case "+value_valorinferior+" - "+value_valorsuperior+" :\n"+statements_cuerpo;
  return code;
};





Blockly.Blocks['bloquebreak'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("break")
        .appendField(new Blockly.FieldTextInput("loop1"), "NAME")
        .appendField(";");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip('break');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloquebreak'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code ="break "+text_name+";\n";
  return code;
};



Blockly.Blocks['bloquebreaknormal'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("break ;");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('break');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloquebreaknormal'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "break;\n";
  return code;
};


Blockly.Blocks['bloquecontinue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("continue ;");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip('continue');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloquecontinue'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "continue;\n";
  return code;
};


Blockly.Blocks['bloquecomentario1'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("%%")
        .appendField(new Blockly.FieldTextInput("Comentario de una linea"), "comentario");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip('comentario');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloquecomentario1'] = function(block) {
  var text_comentario = block.getFieldValue('comentario');
  // TODO: Assemble JavaScript into code variable.
  var code ="%%"+text_comentario+"\n";
  return code;
};


Blockly.Blocks['bloquecomentario2'] = {
  init: function() {
    this.appendStatementInput("cuerpo")
        .setCheck(null)
        .appendField("¿¿");
    this.appendDummyInput()
        .appendField("??");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('comentario de varias lineas');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloquecomentario2'] = function(block) {
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  var code ="¿¿\n"+statements_cuerpo+"??\n";
  return code;
};


Blockly.Blocks['bloquetexto'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("comentario"), "texto");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
    this.setTooltip('texto');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloquetexto'] = function(block) {
  var text_texto = block.getFieldValue('texto');
  // TODO: Assemble JavaScript into code variable.
  var code =text_texto+"\n";
  return code;
};


Blockly.Blocks['bloquewhile'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField("while(");
    this.appendDummyInput()
        .appendField("){");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip('while');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloquewhile'] = function(block) {
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  var code ="while("+value_condicion+"){\n"+statements_cuerpo+"}\n";
  return code;
};


Blockly.Blocks['bloquedowhile'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("do{");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField("}while(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip('do while');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloquedowhile'] = function(block) {
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code ="do{\n"+statements_cuerpo+"}while("+value_condicion+")\n";
  return code;
};


Blockly.Blocks['bloquerepeat'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("repeat {");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField("}until(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(105);
    this.setTooltip('repeat');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloquerepeat'] = function(block) {
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code ="repeat{\n"+statements_cuerpo+"}until("+value_condicion+")\n";
  return code;
};


Blockly.Blocks['bloquefor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("for(")
        .appendField("num")
        .appendField(new Blockly.FieldTextInput("i"), "id0")
        .appendField(":")
        .appendField(new Blockly.FieldNumber(0), "dato")
        .appendField(";");
    this.appendValueInput("condicion")
        .setCheck("Boolean");
    this.appendDummyInput()
        .appendField(";")
        .appendField(new Blockly.FieldTextInput("i"), "id1")
        .appendField("=")
        .appendField(new Blockly.FieldTextInput("i"), "id2")
        .appendField(new Blockly.FieldDropdown([["+","+"], ["-","-"], ["*","*"], ["/","/"], ["%","%"], ["^","6"]]), "operador")
        .appendField(new Blockly.FieldNumber(1), "NAME");
    this.appendDummyInput()
        .appendField("){");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip('for');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloquefor'] = function(block) {
  var text_id0 = block.getFieldValue('id0');
  var number_dato = block.getFieldValue('dato');
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  var text_id1 = block.getFieldValue('id1');
  var text_id2 = block.getFieldValue('id2');
  var dropdown_operador = block.getFieldValue('operador');
  var number_name = block.getFieldValue('NAME');
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  var code ="for(num "+text_id0+" : "+number_dato+";"+value_condicion+";"+text_id1+"="+text_id2+dropdown_operador+number_name+"){\n"+statements_cuerpo+"}\n";
  return code;
};

Blockly.Blocks['bloquecount'] = {
  init: function() {
    this.appendValueInput("condicion")
        .setCheck(null)
        .appendField("count(");
    this.appendDummyInput()
        .appendField("){");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('count');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloquecount'] = function(block) {
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  var code ="count("+value_condicion+"){\n"+statements_cuerpo+"}\n";
  return code;
};



Blockly.Blocks['bloquedowhilex'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("do{");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.appendValueInput("condicion1")
        .setCheck(null)
        .appendField("}whilex(");
    this.appendValueInput("condicion2")
        .setCheck(null)
        .appendField(",");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('do whilex');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloquedowhilex'] = function(block) {
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  var value_condicion1 = Blockly.JavaScript.valueToCode(block, 'condicion1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_condicion2 = Blockly.JavaScript.valueToCode(block, 'condicion2', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code ="do{\n"+statements_cuerpo+"}whilex("+value_condicion1+","+value_condicion2+")\n";
  return code;
};


Blockly.Blocks['bloquedeclaracioninput'] = {
  init: function() {
    this.appendValueInput("dato")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["num","num"], ["str","str"], ["bool","bool"]]), "tipo")
        .appendField(new Blockly.FieldTextInput("i"), "nombre")
        .appendField(":");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('declaracion');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloquedeclaracioninput'] = function(block) {
  var dropdown_tipo = block.getFieldValue('tipo');
  var text_nombre = block.getFieldValue('nombre');
  var value_dato = Blockly.JavaScript.valueToCode(block, 'dato', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code =dropdown_tipo+" "+text_nombre+" : "+value_dato;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['bloquelogico'] = {
  init: function() {
    this.appendValueInput("logico1")
        .setCheck("Boolean");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["&&","&&"], ["||","||"], ["|&","|&"], ["&?","&?"], ["|?","|?"]]), "operador");
    this.appendValueInput("logico2")
        .setCheck("Boolean");
    this.setOutput(true, "Boolean");
    this.setColour(75);
    this.setTooltip('logico');
    this.setHelpUrl('#!/');
  }
};



Blockly.JavaScript['bloquelogico'] = function(block) {
  var value_logico1 = Blockly.JavaScript.valueToCode(block, 'logico1', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operador = block.getFieldValue('operador');
  var value_logico2 = Blockly.JavaScript.valueToCode(block, 'logico2', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code =value_logico1+dropdown_operador+value_logico2;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['bloquenot'] = {
  init: function() {
    this.appendValueInput("not")
        .setCheck("Boolean")
        .appendField("!");
    this.setOutput(true, null);
    this.setColour(285);
    this.setTooltip('not');
    this.setHelpUrl('#!/');
  }
};



Blockly.JavaScript['bloquenot'] = function(block) {
  var value_not = Blockly.JavaScript.valueToCode(block, 'not', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "!"+value_not;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};