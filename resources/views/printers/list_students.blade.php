<!DOCTYPE html>
<html lang="es">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .container {
            width: 100%;
            margin: auto;
            height: 100%;
            max-width: 800px;
        }

        .text-center {
            text-align: center;
        }
        .text-start {
            text-align: start;
        }

        #sub-header {
            display: flex;
            justify-content: space-between;
        }

        .table {
            width: 100%;
            text-align: center;
        }

        table,
        td,
        th {
            border: 1px solid #ddd !important;
            border-collapse: collapse
        }

        table {
            border: 1px solid #ddd !important;
            border-collapse: collapse
        }

        * {
            font-family: "arial";
        }
    </style>
</head>

<body>
    <div class="container px-4">
        <div class="text-center">
            <h4>
                <strong>UNIDAD EDUCATIVA INTERCULTURAL BILINGÜE MARIANO VALLA SAGNAY</strong>
                 <br>
            </h4>
            <h4>COLTA – ECUADOR</h4>
            <h3>Informe de estudiantes</h3>
        </div>
        <div>
           
            <p><strong>Año lectivo:</strong>  {{ $data['promotion'] }}</p>
            <p>
                <span><strong>Curso:</strong> {{ $data['course'] }}</span>
                <span style="float: right"><strong>Paralelo:</strong> {{ $data['parallel'] }}</span>
            </p>
            <table style="width: 100%;" class="table ">
                <thead>
                    <tr>
                        <th>Estudiante</th>
                        <th># Documento</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                        $acc = 0;
                        $countStudents = $data['students']->count();
                    @endphp
                    @if ($countStudents > 0)
                        @foreach ($data['students'] as $student)
                            <tr>
                                <td>
                                    <div  style="text-align: left;padding-left: 5px"> {{ $student->last_name }} {{ $student->first_name }}</div>
                                </td>
                                <td>
                                    {{ $student->doc_number }}
                                </td>
                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td colspan="3">
                                No hay estudiantes
                            </td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>
</body>

</html>
