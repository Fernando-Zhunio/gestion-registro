export class ManagerSchedule {
    initialCell: any;
    finalCell: any;
    tableElement!: HTMLTableElement;
    tableColumnsElement!: HTMLTableElement;
    tableRowElement!: HTMLTableElement;
    overlayElement: any;
    overlayChildElement: any;
    isMovementStarted = false;
    isMouseDown = false;
    // widthColumns = 100;
    // heightRows = 40;
    selectHours: [number, number][] = [];
    private scheduleHours: string[] = [];
    private _intervalMinutes = 15;
    constructor(idTable: string) {
        this.tableElement = document.getElementById(
            idTable
        ) as HTMLTableElement;
        this.tableColumnsElement = document.querySelector('#columns-table') as HTMLTableElement;
        this.tableRowElement = document.querySelector('#slots-table') as HTMLTableElement;
        console.log({ tableElement: this.tableElement, tableColumnsElement: this.tableColumnsElement, tableRowElement: this.tableRowElement });
        document.body.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.tableElement.addEventListener("mousemove", this.onMouseMove.bind(this));
        // this.tableElement?.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.listenerColumns();
    }

    listenerColumns() {
        const tds = this.tableColumnsElement.querySelectorAll(".columns-table td");
        tds.forEach((td) => {
            console.log({ td })
            td.addEventListener("mousemove", (e) => {
                // e.stopPropagation();
                if (!this.isCell(e)) return;
                if (!this.overlayElement) {
                    const columnIndex = (e.target as any)?.cellIndex;
                    this.generateElement(columnIndex, this.initialCell?.parentNode.rowIndex);
                }
                // this.overlayElement = td
                // console.log(e!.target?.localName, this.getCurrentColumn(e));
            });
        });

        this.tableElement.addEventListener("mousedown", (e) => {
            e.stopPropagation();
            if (this.isCell(e)) {
                // this.tableElement.classList.add("columns-up");
                this.isMouseDown = true;
                this.initialCell = e.target;
            }
        });
    }

    generateElement(indexColumn: number, indexRow: number) {
        this.overlayElement = document.createElement("div");
        console.log({ index: indexColumn })
        const column = this.getCurrentColumn(indexColumn);
        const row = this.getCurrentRow(indexRow);
        this.overlayElement.classList.add("schedules-overlay");
        this.overlayElement.style.top = (row.getBoundingClientRect().top - this.tableRowElement.getBoundingClientRect().top)+ "px";
        this.overlayElement.style.left = (column?.getBoundingClientRect().left - this.tableRowElement.getBoundingClientRect().left) + "px";
        this.overlayElement.style.height = `${row.getBoundingClientRect().height}px`;
        this.overlayElement.style.width = `${column?.getBoundingClientRect().width}px`;
        this.overlayElement.style.backgroundColor = "red";
        this.overlayElement.style.zIndex = "100";
        column?.appendChild(this.overlayElement);
        console.log('creado')
    }

    setIntervalMinutes(interval: number) {
        this._intervalMinutes = interval;
    }

    updateOverlaySize(event: { target: any }) {
        let currentCell = event.target;
        const initialCellIndex = this.initialCell?.cellIndex;
        const currentRowIndex = currentCell.parentNode.rowIndex;
        let initialRowIndex = this.initialCell?.parentNode.rowIndex;
        const currentCellIndex = currentCell.cellIndex;

        let endRow = Math.max(initialRowIndex, currentRowIndex);

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

    changeOverlaySize(indexRowInitial: number, indexCurrentRow: number) {
        let currentCellRow: HTMLTableCellElement = this.getCurrentRow(indexCurrentRow);
        const initialCellRow = this.getCurrentRow(indexRowInitial) // this.initialCell?.cellIndex;
        // const currentRowIndex = (currentCellRow?.parentNode as any)?.rowIndex;
        // let initialRowIndex = this.initialCell?.parentNode.rowIndex;
        // const currentCellIndex = currentColumn.cellIndex;

        // let endRow = Math.max(initialRowIndex, currentRowIndex);

        // const startRow = Math.min(initialRowIndex, currentRowIndex);

        // const startCell = Math.min(initialCellIndex, currentCellIndex);
        // const endCell = Math.max(initialCellIndex, currentCellIndex);

        // const startCellElement = this.tableElement!.rows[startRow].cells[startCell];
        // const endCellElement = this.tableElement!.rows[endRow].cells[endCell];

        const startCellRect = initialCellRow.getBoundingClientRect();
        const endCellRect = currentCellRow.getBoundingClientRect();

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
        // this.isMovementStarted = true;
        console.log(this.isCell(e))
        if (this.isMouseDown && this.isCell(e)) {
            console.log('moviendo 2')
            this.finalCell = e.target;
            this.changeOverlaySize(this.initialCell.cellIndex, e.target?.cellIndex);
        }
    }

    onMouseUp(e: any) {
        // this.tableElement.classList.remove("columns-up");
        if (!this.overlayElement) {
            const columnIndex = e.target?.cellIndex;
            this.generateElement(columnIndex, this.initialCell?.parentNode.rowIndex);
        }
        this.overlayElement = null;
        this.isMouseDown = false;
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
        return e?.target?.localName == "td";
    }

    getCurrentRow(index: number) {
        return this.tableRowElement.rows[index].cells[0];
    }
    
    getCurrentColumn(index: number) {
        return this.tableColumnsElement.rows[0].cells[index];
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
