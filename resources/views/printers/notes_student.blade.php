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
        <div class="text-center">
            <h4>
                <strong>UNIDAD EDUCATIVA INTERCULTURAL BILINGÜE MARIANO VALLA SAGNAY</strong>
                <br>
            </h4>
            <h5>COLTA – ECUADOR</h5>
            <h5>Informe de calificaciones de {{$data['trimester']}}{{$data['trimester'] == 2 ? 'do' : 'er'}} trimestre</h5>
        </div>
        <div>
           
            <h3 class="text-center">{{ $data['student']->first_name }} {{ $data['student']->last_name }}</h3>
            <p><strong>Nivel Educación: {{ $data['course']->name }} - BILINGÜE SIERRA</strong></p>
            <p>Se obtuvo las siguientes calificaciones durante el presente año lectivo.</p>
            <table class="table">
                <thead>
                    <tr>
                        <th>Asignaturas</th>
                        <th>Aporte</th>
                        <th>Proyecto 1</th>
                        <th>Evaluación</th>
                        <th>Promedio</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                        $acc = 0;
                        $countSubjects = $data['subjects']->count();
                    @endphp
                    @if ($countSubjects > 0)
                        @foreach ($data['subjects'] as $subject)
                            @php
                                $note = $data['notes']->where('subject_id', $subject->id)?->first();
                                $trimesterKeyAverage = ['averageFirstTrimester', 'averageSecondTrimester', 'averageThirdTrimester']
                            @endphp
                            <tr>
                                <td>
                                    {{ $subject->name }}
                                </td>
                                @if ($note)
                                    <td>
                                        {{-- {{ $note->{{'partial_trimester_'$data['trimester']}}-> }} --}}
                                        {{ ($note->{'partial_trimester_'.$data['trimester']}) ?? 0 }}
                                    </td>
                                    <td>
                                        {{ ($note->{'integrating_project_'.$data['trimester']}) ?? 0 }}
                                    </td>
                                    <td>
                                        {{ ($note->{'evaluation_mechanism_'.$data['trimester']}) ?? 0 }}
                                    </td>
                                    <td>
                                        @php
                                            $acc += $note->{$trimesterKeyAverage[$data['trimester'] -1]} ?? 0;
                                        @endphp
                                        {{
                                            $note->{$trimesterKeyAverage[$data['trimester'] -1]} ?? 0
                                        }}
                                    </td>
                                @else
                                    <td colspan="4"> 
                                        No existen notas en esta materia
                                    </td>
                                @endif
                            </tr>
                        @endforeach
                        <tr>
                            <td><strong>Promedio</strong> </td>
                            <td colspan="3" style="border:none !important;">
                            </td>
                            <td>
                                {{ round($acc / $countSubjects, 2) }}
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
