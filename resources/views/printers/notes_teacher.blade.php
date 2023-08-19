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
            border-collapse: collapse;
        }

        table {
            border: 1px solid #ddd !important;
            border-collapse: collapse;
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
            <h3>Informe de calificaciones de {{$data['trimester']}}{{$data['trimester'] == 2 ? 'do' : 'er'}} trimestre</h3>
        </div>
        <div>
           
            <p>
                <span>Año lectivo: {{ $data['promotion'] }}</span> 
                <span  style="float: right">Curso: {{ $data['course'] }}</span> 
            </p>
            <p>
                <span>Paralelo: {{ $data['parallel'] }}</span>
                <span style="float: right">Materia: {{ $data['subject'] }}</span>
            </p>
            <table class="table">
                <thead>
                    <tr>
                        <th>Estudiante</th>
                        <th>Aporte</th>
                        <th>Proyecto 1</th>
                        <th>Evaluación</th>
                        <th>Promedio</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                        $acc = 0;
                        $countStudents = $data['students']->count();
                    @endphp
                    @if ($countStudents > 0)
                        @foreach ($data['students'] as $student)
                            @php
                                $trimesterKeyAverage = ['averageFirstTrimester', 'averageSecondTrimester', 'averageThirdTrimester']
                            @endphp
                            <tr>
                                <td>
                                    @php
                                        $note = addAverageInNotes($student->notes)->first();
                                    @endphp
                                    <div  style="text-align: left;padding-left: 5px">{{ $student->last_name }} {{ $student->first_name }} </div>  
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
                                {{-- <td>
                                    @php
                                        $note = $data['notes']->where('subject_id', $subject->id)?->first()->noteFinal ?? 0;
                                        $acc += $note;
                                    @endphp
                                    {{ $note }}
                                </td>
                                <td>
                                    {{ $note >= 7 ? 'APROBADO' : 'REPROBADO' }}
                                </td> --}}
                            </tr>
                        @endforeach
                        <tr>
                            <td><strong>Promedio</strong> </td>
                            <td colspan="3" style="border:none !important;">
                                {{-- {{ $acc / $countSubjects ?? 0 }} --}}
                            </td>
                            <td>
                                {{ round($acc / $countStudents, 2) }}
                            </td>
                        </tr>
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
