import { Component, OnInit } from '@angular/core';
import { settingComponentModules } from '@shared/modules';

@Component({
  selector: 'ytt-settings',
  standalone: true,
  imports: settingComponentModules,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}