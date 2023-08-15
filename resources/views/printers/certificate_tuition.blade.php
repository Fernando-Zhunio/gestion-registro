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
                {{-- <strong>{{ env('NAME_COLLEGE') }}</strong> <br> --}}
                <strong>UNIDAD EDUCATIVA INTERCULTURAL BILINGÜE MARIANO VALLA SAGNAY
                </strong><br>
            </h4>
            <h4>COLTA – ECUADOR</h4>
            <h2>CERTIFICADO DE MATRÍCULA</h2>
        </div>
        <div>
            <div>
                <p>
                    <span>Año lectivo: {{ $data['period']->promotion }}</span>
                    <span style="float: right">No. Matrícula: {{ $data['period']->id }}</span>
                </p>
                <p>
                    <span>Nivel Educación: {{ $data['tuition']->course->name }}</span>
                    <span style="float: right">Paralelo: {{ $data['tuition']->parallel->name }}</span>
                </p>
                <p>
                    <span>Fecha: {{\Carbon\Carbon::parse($data['tuition']->created_at)->format('d/m/Y')  }}</span>
                </p>
            </div>
            <p>Quién suscribe, Rector/a certifica que el(la) estudiante: </p>
            <h3 class="text-center">{{ $data['student']->first_name }} {{ $data['student']->last_name }}</h3>
            <p>Con CI. {{ $data['student']->doc_number }}, Previo al cumplimiento de los requisitos legales, se
                matriculó en el
                curso indicado según consta en el listado de estudiantes de Ministerio de Educación que
                reposan en esta institución.
            </p>
            <br>
            <br>
            <br>
            @php
                \Carbon\Carbon::setLocale('es');
                setlocale(LC_ALL, 'es_ES');
            @endphp
            <p>San Bartolo, {{ \Carbon\Carbon::now()->isoFormat('D \d\e MMMM \d\e\l Y')}}</p>
            <br>
            <div class="text-center">
                <p class="text-center" style="width: 200px;border-bottom: 1px solid;margin: auto;
                margin-block: 20px"></p>
                <div style="margin-bottom: 10px;margin-top: 5px">
                    {{currentState()->observation}}
                </div>
                <div>
                    <strong>
                        RECTOR(A)
                    </strong>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
