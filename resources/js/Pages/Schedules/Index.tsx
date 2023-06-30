import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { useEffect, useState } from 'react';

const IndexSchedule = () => {
    const data = [
        {
          Id: 1,
          Subject: 'Meeting',
          StartTime: new Date(2023, 1, 15, 10, 0),
          EndTime: new Date(2023, 1, 15, 12, 30),
        },
      ];
      const [partition, setPartition] = useState<any[]>([]);
      const [typePartition, setTypePartition] = useState<string>('minutes');
      useEffect(() => {
        
        for (let index = 0; index < 24; index++) {
            if(typePartition == 'minutes'){
                for (let index2 = 0; index2 < 60; index2 = index2 + 5) {
                    const time = `${String(index).padStart(2,  '0')}:${String(index2).padStart(2,  '0')}`
                    console.log({time})
                    setPartition((state) => [...state, time])
                }
            }
        }
      }, []);
      return (
        // <ScheduleComponent
        //   selectedDate={new Date(2023, 1, 15)}
        //   eventSettings={{
        //     dataSource: data,
        //   }}
        // >
        //   <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        // </ScheduleComponent>
        <div>
            <div>
                <div>
                    <nav>
                        <span>Junio 25</span>
                        <span>Semana</span>
                    </nav>
                    <div>
                        <table className='table-auto table-schedule '>
                                <thead>
                                    <td>Horas</td>
                                    <td>Lunes</td>
                                    <td>Martes</td>
                                    <td>Miercoles</td>
                                    <td>Jueves</td>
                                    <td>Viernes</td>
                                    <td>Sabado</td>
                                    <td>Domingo</td>
                                </thead>
                            <tbody>
                                 {
                                    partition.map((item, index) => {
                                        return <tr>
                                            <td>{item}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    })
                                 }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      ); 
};

export default IndexSchedule;