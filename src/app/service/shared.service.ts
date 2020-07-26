import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public userName = 'Terri';

  constructor() { }
}


/**Can have the logic to ask the user for the userName he/she wants to use
 * and set the value to the above variable
 */
