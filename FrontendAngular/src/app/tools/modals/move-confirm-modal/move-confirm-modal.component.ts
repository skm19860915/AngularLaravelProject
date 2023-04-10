import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CardItem } from '../../../components/interfaces/CardItem';
import { FileviewService } from '../../../shared/fileview.service';

@Component({
  selector: 'app-move-confirm-modal',
  templateUrl: './move-confirm-modal.component.html',
  styleUrls: ['./move-confirm-modal.component.css']
})
export class MoveConfirmModalComponent {
   
    constructor(
        private dialogRef: MatDialogRef<MoveConfirmModalComponent>
    ) {}
    onMoveConfirm(flag) {
        this.dialogRef.close(flag);
    }

}
