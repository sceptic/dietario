var operation = "A"; //"A"=Adding; "E"=Editing

var selected_index = -1; //Index of the selected list item

var misDietas = localStorage.getItem("misDietas");//Retrieve the stored data
misDietas = JSON.parse(misDietas); //Converts string to object
	
if(misDietas == null)
{
	misDietas = [];
}else{
		
}


function crearDieta(){
 	//alert('-->'+misDietas.toString());
	// Añadir/quitar comidas
 
 $('#addComidaF').bind('click',function(){
	
	clon = $('.item:first').clone()
	clon.appendTo('#comidas');
	
	clon.find('.t').val('');
	clon.find('.comida').val('');
	
	clon2 = $('.delComida:first').clone()
	clon2.appendTo(clon);
	$('.delComida').bind('click',function(){
		$(this).closest('.item').remove();
	});  	 		 
 });

 //Guardar
}


var itmDel;
function list(){
	$('#lDietas').html('');
	$('#dieta').html('');
	$('#lDietas').show();
$.each(misDietas, function(i,v){	
		var dieta = JSON.parse(v);
		var itm = " <div data-role='fieldcontain'><strong  data-inline='true'>"+dieta.nombre+"</h3> "+"<img src='assets/img/"+dieta.valoracion+"s.png'/> <div data-role='controlgroup' data-type='horizontal' data-mini='true'><a  data-inline='true' data-role='button' class='itemDieta' id='"+i+"'>ver dieta</a><a data-inline='true' data-rel='dialog' data-role='button' href='#comfirmacionDel' class='del_itemDieta' id='"+i+"del'>eliminar dieta</a></div></div></div>";
		
		$('#lDietas').append(itm).trigger( 'create' );
		$('.itemDieta').bind('click',function(){
		itemDieta = $(this).attr('id');
		//alert(misDietas[itemDieta]);
		var dieta = JSON.parse(misDietas[itemDieta]);
		_title = "<h3>"+dieta.nombre+"</h3>";
		_valor = "<img src='assets/img/"+dieta.valoracion+"s.png'/>";
		_peso = "<div data-role='fieldcontain'><strong>Peso corporal:</strong> "+dieta.peso+"</div>";
		_objetivo = "<div data-role='fieldcontain'><strong>Objetivo:</strong> "+dieta.objetivo+"</div>";
		
		_comidas = "<h4>Comidas:</h4><div style='margin:20px;' data-role='fieldcontain'><ul data-role='listview'>";
		$.each(dieta.comidas, function(i,v){	
			_comidas+= "<li data-role='list-divider'><a><font style='white-space:normal;' >"+v.hora+" "+v.comida+"</font></a></li>";
		});
		_comidas +="</ul></div>";
		
		var infoDieta = _title + _valor  + _peso + _objetivo + _comidas;
		$('#lDietas').hide(500);
		$('#dieta').html('');
		$('#dieta').append(infoDieta).trigger( 'create' );
			
	});
	});	
}

/*****************************************************/

function alertDismissed() {
    // hacer algo
}



function onInit() {
	
	crearDieta();
	setTimeout(function(){
		navigator.notification.beep();
		navigator.notification.alert(
    'Eres el ganador!',     // mensaje (message)
    alertDismissed,         // función 'callback' (alertCallback)
    'Game Over',            // titulo (title)
    'Cerrar'                // nombre del botón (buttonName)
    );
		},30000);
	

    //Guardar
	
	$('#guardar').bind('click',function(){
		
	var comidas = [];
	nombre= $('#nombre').val();
	objetivo = $('#objetivo').val();
	peso = $('#peso').val();
	autor = $('#autor').val();
	valoracion = $('#valoracion').val();
	
	$('.item').each(function(index, element) {
       hora = ($('.t:eq('+index+')').val());
	   comida = ($('.comida:eq('+index+')').val());
	   
	   comidas.push({'hora':hora, 'comida':comida});
	});   
	
   		  
	dieta =JSON.stringify({
			'nombre': nombre,
			'objetivo':objetivo,
			'peso':peso,
			'objetivo':objetivo,
			'autor':autor,
			'comidas':comidas,
			'valoracion':valoracion	   
	   });
	   
	   misDietas.push(dieta);
	   localStorage.setItem("misDietas", JSON.stringify(misDietas));
	   
	   //reset form
	  	$('#nombre').val('');
		$('#objetivo').val('');
		$('#peso').val('');
		$('#autor').val('');
		$('#valoracion').val('');
	
		$('.item').each(function(index, element) {
       		$('.t:eq('+index+')').val('');
	   		$('.comida:eq('+index+')').val('');	
	});   
    });
	
	
	
	$('.del_itemDieta').bind('click',function (){
		
		
		itmDel =   parseInt($(this).attr('id'));  
	});
		
	
	
	$('.vDietas').bind('click', function(){
		list();		
	});
	
	$('#delOk').bind('click',function(){
	  
	  	 var idDieta = itmDel;
		misDietas.splice(idDieta, 1);
		localStorage.setItem("misDietas", JSON.stringify(misDietas));
		list();
		
	return true;		
	});
	
	
	
}

//$(document).delegate("#home", "pageshow", onInit);
document.addEventListener("deviceready", onInit, false);