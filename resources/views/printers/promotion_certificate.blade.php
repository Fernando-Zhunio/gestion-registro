<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
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

        .sub-header {
            display: flex;
            justify-content: space-between;
        }
    </style>
</head>

<body>
    <div class="container px-4">
        <header>
            <h1>Document</h1>
            <div class="sub-header">
                <span>
                    <strong>AÑO LECTIVO:</strong> {{ $data['period']->promotion }}
                </span>
                <span>
                    <strong>RÉGIMEN:</strong> SIERRA
                </span>
            </div>
            <h2 class="text-center">CERTIFICADO DE PROMOCION</h2>
        </header>
        <div class="text-center">
            <h3>
                <strong>{{ env('NAME_COLLEGE') }}</strong>
            </h3>
        </div>
        <div>
            <p>
                De conformidad con lo prescrito en el Art. 197 del Reglamento General a la Ley Orgánica de Educación
                Intercultural y demás
                normativas vigentes, certifica que el/la estudiante
            </p>
            <h2 class="text-center">{{ $data['student']->first_name }} {{ $data['student']->last_name }}</h2>
            <p><strong>Nivel: {{ $data['course']->name }} - BILINGÜE SIERRA</strong></p>
            <p>Se obtuvo las siguientes calificaciones durante el presente año lectivo.</p>

            <table>
                <thead>
                    <tr>
                        <th>ASIGNATURA</th>
                        <th>CALIFICACIÓN CUANTITATIVA</th>
                        <th>EQUIVALENCIA</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($data['subjects'] as $subject)
                    <tr>
                            <td>
                                {{ $subject->name }}
                            </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</body>

</html>
