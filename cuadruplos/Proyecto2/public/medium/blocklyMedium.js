
//window.addEventListener('load',inicializarBlockly, false);
function blocklyMedium(){
  
  workspace = Blockly.inject('workspaceMedium',
      {toolbox: document.getElementById('toolboxMedium'),
  		zoom:
         {controls: true,
          wheel: true,
          startScale: 0.80,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2},
     trashcan: true});
  workspace.addChangeListener(listenerBlocklyMedium);
workspace.addChangeListener(onFirstComment);
workspace.addChangeListener(eventoModificar);
}


function listenerBlocklyMedium(event) {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  //document.getElementById('txtCodigo').value = code;

}


function onFirstComment(event) {
  if (event.type == Blockly.Events.CREATE) {
      //console.log(event);
    //alert(objetoGenerado.codigo)
    //workspace.removeChangeListener(onFirstComment);
    if(objetoGenerado==null){
      //return;
    }

    if(objetoGenerado.tipo==="metodo"){
       //objetoGenerado.id=event.blockId;
       //console.log(objetoGenerado.codigo);
       //setFuncion(objetoGenerado);
       //objetoGenerado=null;
    }else if(objetoGenerado.tipo=="element"){
      //setElement(objetoGenerado);
    }

  }
}

function eventoModificar(event) {
  if (event.type == Blockly.Events.CHANGE) {
    if(objetoGenerado!=null){
      //console.log("__");
      //console.log(event.blockId);
      ///console.log(objetoGenerado.id);
      //console.log("__");
      if(event.blockId===objetoGenerado.id){
        //modificarObjeto(event.blockId,objetoGenerado);
        //objetoGenerado=null;
      }
    }
  }
}


Blockly.Blocks['bloquemetodo'] = {
  init: function() {
    this.appendValueInput("parametros")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("void"), "tipo")
        .appendField(":")
        .appendField(new Blockly.FieldTextInput("metodo"), "nombre")
        .appendField("(");
    this.appendDummyInput()
        .appendField("){");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setColour(120);
    this.setTooltip('funcion');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloquemetodo'] = function(block) {
  var text_tipo = block.getFieldValue('tipo');
  var text_nombre = block.getFieldValue('nombre');
  var value_parametros = Blockly.JavaScript.valueToCode(block, 'parametros', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  value_parametros=value_parametros.replace("(","");
  value_parametros=value_parametros.replace(")","");
  value_parametros=value_parametros.substring(0,value_parametros.length-1);
  var code =text_tipo+" : "+text_nombre+"("+value_parametros+"){\n"+statements_cuerpo+"}\n";
  //var f=new funcion(text_nombre);
  //objetoGenerado={"nombre":text_nombre,"codigo":code,"tipo":"metodo","id":block.id};
  //console.log(block.id);
  //modificarObjeto(block.id,objetoGenerado);
  objetoGenerado={"nombre":text_nombre,"codigo":code,"tipo":"metodo","id":block.id};
  setFuncion(objetoGenerado);
  modificarObjeto(objetoGenerado);
  return code;
};



Blockly.Blocks['bloquemetodoprincipal'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Principal( ){");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setColour(330);
    this.setTooltip('funcion');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloquemetodoprincipal'] = function(block) {
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  var code ="Principal(){\n"+statements_cuerpo+"}\n";
  objetoGenerado={"nombre":"Principal","codigo":code,"tipo":"metodo","id":block.id};
  setFuncion(objetoGenerado);
  modificarObjeto(objetoGenerado);
  return code;
};









var objetoGenerado;

Blockly.Blocks['bloqueparametro'] = {
  init: function() {
    this.appendValueInput("parametro")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("num"), "tipo")
        .appendField(new Blockly.FieldTextInput("parametro"), "nombre");
    this.setOutput(true, null);
    this.setColour(90);
    this.setTooltip('parametro');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloqueparametro'] = function(block) {
  var text_tipo = block.getFieldValue('tipo');
  var text_nombre = block.getFieldValue('nombre');
  var value_parametro = Blockly.JavaScript.valueToCode(block, 'parametro', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code =text_tipo+" "+text_nombre+","+value_parametro;
  code=code.replace("(","");
  code=code.replace(")","");
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.Blocks['bloquedimension2'] = {
  init: function() {
    this.appendValueInput("dimension")
        .setCheck(null)
        .appendField("[")
        .appendField(new Blockly.FieldNumber(0), "inferior")
        .appendField("..")
        .appendField(new Blockly.FieldNumber(0), "superior")
        .appendField("]");
    this.setOutput(true, null);
    this.setColour(45);
    this.setTooltip('dimension');
    this.setHelpUrl('#!/');
  }
};



Blockly.JavaScript['bloquedimension2'] = function(block) {
  var number_inferior = block.getFieldValue('inferior');
  var number_superior = block.getFieldValue('superior');
  var value_dimension = Blockly.JavaScript.valueToCode(block, 'dimension', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code ="["+number_inferior+".."+number_superior+"]"+value_dimension;
  code=code.replace("(","");
  code=code.replace(")","");
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['bloquedimension1'] = {
  init: function() {
    this.appendValueInput("dimension")
        .setCheck(null)
        .appendField("[")
        .appendField(new Blockly.FieldNumber(0), "inferior")
        .appendField("]");
    this.setOutput(true, null);
    this.setColour(45);
    this.setTooltip('dimension');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloquedimension1'] = function(block) {
  var number_inferior = block.getFieldValue('inferior');
  var value_dimension = Blockly.JavaScript.valueToCode(block, 'dimension', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code ="["+number_inferior+"]"+value_dimension;
  code=code.replace("(","");
  code=code.replace(")","");
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.Blocks['bloqueparametroarray'] = {
  init: function() {
    this.appendValueInput("parametro")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("num"), "tipo")
        .appendField(new Blockly.FieldTextInput("parametro"), "nombre");
    this.appendValueInput("dimensiones")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(90);
    this.setTooltip('parametro tipo arreglo');
    this.setHelpUrl('#!/');
  }
};



Blockly.JavaScript['bloqueparametroarray'] = function(block) {
  var text_tipo = block.getFieldValue('tipo');
  var text_nombre = block.getFieldValue('nombre');
  var value_parametro = Blockly.JavaScript.valueToCode(block, 'parametro', Blockly.JavaScript.ORDER_ATOMIC);
  var value_dimensiones = Blockly.JavaScript.valueToCode(block, 'dimensiones', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  value_parametro=value_parametro.replace("(","");
  value_parametro=value_parametro.replace(")","");

  var code =text_tipo+" "+text_nombre+" "+value_dimensiones+","+value_parametro;
  code=code.replace("(","");
  code=code.replace(")","");
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.Blocks['bloqueelement'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("element")
        .appendField(":")
        .appendField(new Blockly.FieldTextInput("Nodo"), "nombre")
        .appendField("{");
    this.appendStatementInput("cuerpo")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("}");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('element');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloqueelement'] = function(block) {
  var text_nombre = block.getFieldValue('nombre');
  var statements_cuerpo = Blockly.JavaScript.statementToCode(block, 'cuerpo');
  // TODO: Assemble JavaScript into code variable.
  var code ="element : "+text_nombre+"{\n"+statements_cuerpo+"}\n";
  objetoGenerado={"nombre":text_nombre,"codigo":code,"tipo":"element","id":block.id};
  setElement(objetoGenerado);
  modificarEstructura(objetoGenerado);
  return code;
};




Blockly.Blocks['bloquetipo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["num","num"], ["str","str"], ["bool","bool"]]), "tipo");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('tipo');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloquetipo'] = function(block) {
  var dropdown_tipo = block.getFieldValue('tipo');
  // TODO: Assemble JavaScript into code variable.
  var code =dropdown_tipo;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};





Blockly.Blocks['bloquedeclaracionprimitiva'] = {
  init: function() {
    this.appendValueInput("valor")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["num","num"], ["str","str"], ["bool","bool"]]), "tipo")
        .appendField(new Blockly.FieldTextInput("id"), "nombre")
        .appendField(":");
    this.appendDummyInput()
        .appendField(";");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('primitiva');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloquedeclaracionprimitiva'] = function(block) {
  var dropdown_tipo = block.getFieldValue('tipo');
  var text_nombre = block.getFieldValue('nombre');
  var value_valor = Blockly.JavaScript.valueToCode(block, 'valor', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code =dropdown_tipo+" "+text_nombre+" : "+value_valor+";\n";
  return code;
};





Blockly.Blocks['bloqueid'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("id"), "nombre");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('id');
    this.setHelpUrl('#!/');
  }
};

Blockly.JavaScript['bloqueid'] = function(block) {
  var text_nombre = block.getFieldValue('nombre');
  // TODO: Assemble JavaScript into code variable.
  var code = text_nombre;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['bloquedeclaracion'] = {
  init: function() {
    this.appendValueInput("tipo")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("id"), "nombre")
        .appendField(";");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('declaracion');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloquedeclaracion'] = function(block) {
  var value_tipo = Blockly.JavaScript.valueToCode(block, 'tipo', Blockly.JavaScript.ORDER_ATOMIC);
  var text_nombre = block.getFieldValue('nombre');
  // TODO: Assemble JavaScript into code variable.
  value_tipo=value_tipo.replace(")","");
  value_tipo=value_tipo.replace("(","");
  var code =value_tipo+" "+text_nombre+";\n";
  return code;
};


Blockly.Blocks['bloquedeclaracionelement'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("Tipo"), "tipo")
        .appendField(new Blockly.FieldTextInput("id"), "nombre")
        .appendField(": create(")
        .appendField(new Blockly.FieldTextInput("Tipo"), "tipo2")
        .appendField(");");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('declaracion element');
    this.setHelpUrl('#!/');
  }
};


Blockly.JavaScript['bloquedeclaracionelement'] = function(block) {
  var text_tipo = block.getFieldValue('tipo');
  var text_nombre = block.getFieldValue('nombre');
  var text_tipo2 = block.getFieldValue('tipo2');
  // TODO: Assemble JavaScript into code variable.
  var code =text_tipo+" "+text_nombre+" : create("+text_tipo2+");\n";
  return code;
};


