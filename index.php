<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="js/event.js"></script>
</head>

<body>
    <div class="container">

        <h2 class="text-center my-3">Chat</h2>

        <label for="photo" class="form-label">Pregunta:</label>
        <input type="text" id="txt_question" class="form-control" placeholder="Ingrese una pregunta" required>
        <br>

        <label for="photo" class="form-label">Link imagen:</label>
        <input type="url" id="urlInput" placeholder="Ingrese la URL de la imagen" class="form-control " id="customFile" required>


        <div class="elem">
            <button id='btn_send' class="w-25 btn btn-primary btn-sm btn-sm">Chat GPT</button>
        </div>

        <div id="vistaPreviaContainer"></div>
        <br>

        <div>
            <h2>Respuesta</h2>
            <!-- <textarea id="txt_rta"></textarea> -->
            <div id="visualize"></div>
        </div>

        <br><br>

        <div>
            <h2 class="text-center">Historial de conversaciones</h2>
            <table id="tabla"></table>
        </div>
       
        <div class="elem">
            <button id='btn_remove' class="w-25 btn btn-danger btn-sm my-3 btn-sm">Borrar Chat</button>
        </div>
        

    </div>
</body>

</html>