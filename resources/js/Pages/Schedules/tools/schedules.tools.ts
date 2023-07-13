export class ManagerSchedule {
    initialCell: any;
    finalCell: any;
    tableElement!: HTMLTableElement;
    overlayElement: any;
    overlayChildElement: any;
    isMovementStarted = false;
    isMouseDown = false;
    selectHours: [number, number][] = [];
    private scheduleHours: string[] = [];
    private _intervalMinutes = 15;
    constructor(idTable: string) {
        this.tableElement = document.getElementById(
            idTable
        ) as HTMLTableElement;
        // document.body.addEventListener("mouseup", this.onMouseUp.bind(this));
        // this.tableElement.addEventListener("mousemove", this.onMouseMove.bind(this));
        // this.tableElement?.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.listenerTdColumns();
    }

    listenerTdColumns() {
        const tds = document.querySelectorAll(".columns-table td");
        // console.log({ tds })
        tds.forEach((td) => {
            console.log({ td })
            td.addEventListener("mousedown", (e) => {
                e.stopPropagation();
                console.log("mousedown", this.getCurrentRow(e));
            });
        });
    }

    setIntervalMinutes(interval: number) {
        this._intervalMinutes = interval;
    }

    updateOverlaySize(event: { target: any }) {
        if (!this.tableElement || !this.overlayElement) return;
        let currentCell = event.target;
        const initialCellIndex = this.initialCell?.cellIndex;
        console.log({ initialCellIndex })
        const currentRowIndex = currentCell.parentNode.rowIndex;
        let initialRowIndex = this.initialCell?.parentNode.rowIndex;
        const currentCellIndex = currentCell.cellIndex;
        // ----------------
        const startDate = this.initialCell?.cellIndex;
        const endDate = currentCell?.cellIndex;
        // const endRow;
        let endRow = Math.max(initialRowIndex, currentRowIndex);
        if (startDate !== endDate) {
            
        }
        // ----------------

        const startRow = Math.min(initialRowIndex, currentRowIndex);

        const startCell = Math.min(initialCellIndex, currentCellIndex);
        const endCell = Math.max(initialCellIndex, currentCellIndex);

        const startCellElement = this.tableElement!.rows[startRow].cells[startCell];
        const endCellElement = this.tableElement!.rows[endRow].cells[endCell];

        const startCellRect = startCellElement.getBoundingClientRect();
        const endCellRect = endCellElement.getBoundingClientRect();

        const overlayTop = startCellRect.top - this.tableElement.getBoundingClientRect().top;
        const overlayLeft = startCellRect.left - this.tableElement.getBoundingClientRect().left;
        const overlayHeight = endCellRect.bottom - startCellRect.top;
        const overlayWidth = endCellRect.right - startCellRect.left;

        this.overlayElement.style.top = overlayTop + "px";
        this.overlayElement.style.left = overlayLeft + "px";
        this.overlayElement.style.height = overlayHeight + "px";
        this.overlayElement.style.width = overlayWidth + "px";
    }

    onMouseDown(e: any) {
        this.isMovementStarted = false;
        if (!this.isCell(e)) {
            return;
        }
        this.isMouseDown = true;
        this.initialCell = e.target;
        // document.body.style.pointerEvents = "none";
        this.overlayElement = document.createElement("div");
        this.overlayChildElement = document.createElement("div");
        this.overlayChildElement.classList.add("schedules-overlay-child");
        this.overlayElement.appendChild(this.overlayChildElement);
        this.overlayElement.classList.add("schedules-overlay");
        this.overlayElement.setAttribute("draggable", "false");

        this.overlayElement.addEventListener("mousedown", (e: any) => {
            e.stopPropagation();
        });
        this.tableElement?.appendChild(this.overlayElement);
        // const hour = partition[initialCell?.parentNode.rowIndex];
        // console.log({ cellIndex: initialCell?.cellIndex, hour });
    }

    onMouseMove(e: any) {
        this.isMovementStarted = true;
        if (this.isMouseDown && this.isCell(e)) {
            this.finalCell = e.target;
            this.updateOverlaySize(e);
        }
    }

    onMouseUp(e: any) {
        if (
            this.isMovementStarted &&
            (this.isCell(e) || this.isCell(this.finalCell))
        ) {
            if (e.target?.localName == "td") {
                this.finalCell = e.target;
                //  tableRef?.current?.removeChild(overlayDiv);
            }
            const hour = this.scheduleHours[this.finalCell?.parentNode.rowIndex];
            this.overlayElement.style.pointerEvents = "all";
            this.addHtmlTimeForSelection();
        }
        this.isMouseDown = false;
        this.initialCell = null;
    }

    isCell(e: any) {
        return e.target?.localName == "td";
    }

    getCurrentRow(e: any) {
        return e.target?.parentNode.rowIndex;
    }

    generateHours(interval: number| null = null) {
        this._intervalMinutes = interval || this._intervalMinutes;
        for (let index = 6; index < 24; index++) {
            for (let index2 = 0; index2 < 60; index2 = index2 + this._intervalMinutes) {
                const time = `${String(index).padStart(2, "0")}:${String(
                    index2
                ).padStart(2, "0")}`;

                this.scheduleHours.push(time);
            }
        }
        return this.scheduleHours;
    }

    getScheduleHours() {
        this.scheduleHours;
    }

    
    addHtmlTimeForSelection(){
        const startDate = this.initialCell?.cellIndex;
        const endDate = this.finalCell?.cellIndex;
        const startHour = this.scheduleHours[this.initialCell?.parentNode.rowIndex - 1];
        const endHour = this.scheduleHours[this.finalCell?.parentNode?.rowIndex];
        if (!startDate || !endDate || !startHour || !endHour) {
            this.tableElement.removeChild(this.overlayElement);
        }

        let textHtml = `${startHour} - ${endHour}`;
        if (startDate !== endDate) {
            const minDate = Math.min(startDate, endDate);
            const maxDate = Math.max(startDate, endDate);
            textHtml += ` | ${this.getPrefixDayForIndex(
                minDate - 1
            )} - ${this.getPrefixDayForIndex(maxDate - 1)}`;
        }
        this.overlayChildElement.innerHTML = textHtml;
        // this.selectHours.push([startDate, endDate, startHour, endHour]);

    };

    generateDiffTime(startHour: string, endHour: string, startDay: number, endDay: number) {
        const startHourSplit = startHour.split(":");
        const endHourSplit = endHour.split(":");
        const startHourNumber = parseInt(startHourSplit[0]);
        const endHourNumber = parseInt(endHourSplit[0]);
        const startMinuteNumber = parseInt(startHourSplit[1]);
        const endMinuteNumber = parseInt(endHourSplit[1]);
        // const diffHour = endHourNumber - startHourNumber;
        // const diffMinute = endMinuteNumber - startMinuteNumber;
        // const diffDay = endDay - startDay;
        // const diffTime = diffHour * 60 + diffMinute;
        // return { diffHour, diffMinute, diffDay, diffTime };


    

    }

    getPrefixDayForIndex(index: number) {
        const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
        return days[index];
    };
}
