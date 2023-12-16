
$(function () {
    // Función para cargar preguntas y respuestas almacenadas en localStorage
    function cargarPreguntasRespuestas() {
        for (let i = 0; i < localStorage.length; i++) {
            key = localStorage.key(i);
            // console.log(key + " " + localStorage.getItem(key));
        }
    }

    // Función para almacenar preguntas y respuestas en localStorage
    function almacenarPreguntaRespuesta(pregunta, respuesta) {
        localStorage.setItem(pregunta, respuesta);
    }

    var archivo;

    cargarPreguntasRespuestas();

    $("#btn_send").click(function () {
        var question = $("#txt_question").val();
        var imageUrl = $("#urlInput").val();
        console.log(question);

        const urlInput = document.getElementById("urlInput");
        const url = urlInput.value;

        if (url) {
            const imgElement = document.createElement("img");
            imgElement.setAttribute('width', '250');
            imgElement.setAttribute('height', '250');
            imgElement.src = url;

            const vistaPreviaContainer = document.getElementById("vistaPreviaContainer");
            vistaPreviaContainer.innerHTML = "";
            vistaPreviaContainer.appendChild(imgElement);


            $.ajax({
                url: "https://api.openai.com/v1/chat/completions",
                type: "POST",
                max_tokens: 100,
                data: JSON.stringify({
                    model: "gpt-4-vision-preview",
                    messages: [
                        {
                            role: "user",
                            content: [
                                { type: "text", text: question },
                                {
                                    type: "image_url",
                                    image_url: {
                                        url: imageUrl,
                                    },
                                },
                            ],
                        },
                    ], temperature: 1,
                    max_tokens: 256,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0

                }),
                headers: {
                    'Authorization': 'Bearer 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',
                    'Content-Type': 'application/json',
                },
                success: function (response) {
                    var answer = response.choices[0].message.content;
                    console.log(response.choices[0]);
                    // Mostrar la respuesta en el textarea
                    $("#txt_rta").html(answer);

                    // Almacenar la pregunta y respuesta en localStorage
                    almacenarPreguntaRespuesta(question, answer);

                    visualize(answer);

                    // Actualizar la tabla HTML
                    actualizarTabla();


                }
            });
        } else {
            alert("Ingrese una URL válida");
        }
    });

    function visualize(component) {
        var tabla = $("#visualize").get(0);
        tabla.innerHTML = component;
    }

    $("#btn_remove").click(function () {
        localStorage.clear();
        actualizarTabla();
    });

    // Función para actualizar la tabla HTML con las preguntas y respuestas
    function actualizarTabla() {
        var tabla = $("#tabla").get(0);

        // Limpiar la tabla antes de actualizar
        tabla.innerHTML = '<tr style="background-color: #3498db; color: white;"><th>Pregunta</th><th>Respuesta</th></tr>';

        // Agregar cada pregunta y respuesta a la tabla
        for (let i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            agregarFilaTabla(key, value, i);
        }
    }

    function agregarFilaTabla(pregunta, respuesta, index) {
        var tabla = $("#tabla").get(0);
        var row = tabla.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.textContent = pregunta;
        cell2.textContent = respuesta;

        // Aplicar colores de azul intercalados a las filas
        if (index % 2 === 0) {
            row.style.backgroundColor = '#ecf0f1';
        } else {
            row.style.backgroundColor = '#d4e6f1';
        }
    }

    // Llamar a la función para actualizar la tabla al cargar la página
    $(document).ready(function () {
        actualizarTabla();
    });
});