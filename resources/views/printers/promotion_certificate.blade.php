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
        }

        table {
            border: 1px solid #ddd !important;
        }

        * {
            font-family: "arial";
        }
    </style>
</head>

<body>
    <div class="container px-4">
        <header>
            <div class="text-center">
                <img src="{{ asset('img/logo_ecuador.png') }}" alt="">
            </div>
            <div id="sub-header">
                <a style="display: flex; width: 100%;justify-content: space-between">
                    <strong>AÑO LECTIVO:</strong> {{ $data['period']->promotion }}
                    <div style="float: right">
                        <strong>RÉGIMEN:</strong> SIERRA
                    </div>
                </a>

            </div>
            <h2 class="text-center">CERTIFICADO DE PROMOCION</h2>
        </header>
        <div class="text-center">
            <h4>
                <strong>UNIDAD EDUCATIVA INTERCULTURAL BILINGÜE MARIANO VALLA SAGNAY</strong>
            </h4>
        </div>
        <div>
            <p>
                De conformidad con lo prescrito en el Art. 197 del Reglamento General a la Ley Orgánica de Educación
                Intercultural y demás
                normativas vigentes, certifica que el/la estudiante
            </p>
            <h3 class="text-center">{{ $data['student']->first_name }} {{ $data['student']->last_name }}</h3>
            <p><strong>Nivel: {{ $data['course']->name }} - BILINGÜE SIERRA</strong></p>
            <p>Se obtuvo las siguientes calificaciones durante el presente año lectivo.</p>
            <table class="table">
                <tbody>
                    <tr>
                        <th rowspan="2">ASIGNATURA</th>
                        <th colspan="2">
                            PROMEDIO ANUAL
                        </th>
                    </tr>
                    <tr>
                        <th>CALIFICACIÓN CUANTITATIVA</th>
                        <th>EQUIVALENCIA</th>
                    </tr>
                    
                    @php
                        $acc = 0;
                        $countSubjects = $data['subjects']->count();
                    @endphp
                    @if ($countSubjects > 0)
                        @foreach ($data['subjects'] as $subject)
                            <tr>
                                <td>
                                    {{ Normalizer::normalize($subject->name) }}
                                </td>
                                <td>
                                    @php
                                        $note = $data['notes']->where('subject_id', $subject->id)?->first()->noteFinal ?? 0;
                                        $acc += $note;
                                    @endphp
                                    {{ $note }}
                                </td>
                                <td>
                                    {{ $note >= 7 ? 'APROBADO' : 'REPROBADO' }}
                                </td>
                            </tr>
                        @endforeach
                        <tr>
                            <td><strong>Promedio</strong> </td>
                            <td>
                                {{ $acc / $countSubjects ?? 0 }}
                            </td>
                            <td>
                                {{ (($acc / $countSubjects) ?? 0) >= 7 ? 'APROBADO' : 'REPROBADO' }}
                            </td>
                        </tr>
                    @else
                        <tr>
                            <td colspan="3">
                                No hay asignaturas
                            </td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>
</body>

</html>
