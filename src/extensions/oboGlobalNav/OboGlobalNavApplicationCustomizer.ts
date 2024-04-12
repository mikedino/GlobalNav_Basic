import { Components } from "gd-sprest-bs";
//import { buildings } from "gd-sprest-bs/src/icons/svgs/buildings";
//import { buildings } from "gd-sprest-bs/build/icons/svgs/buildings";
import { Log } from '@microsoft/sp-core-library';
//import * as styles from "./NavStyles.scss";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
//import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'OboGlobalNavApplicationCustomizerStrings';

require('./NavStyles.scss');

const LOG_SOURCE: string = 'OboGlobalNavApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IOboGlobalNavApplicationCustomizerProperties {
  // This is an example; replace with your own property
  //testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class OboGlobalNavApplicationCustomizer
  extends BaseApplicationCustomizer<IOboGlobalNavApplicationCustomizerProperties> {

  private _header:PlaceholderContent | any = null;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // let message: string = this.properties.testMessage;
    // if (!message) {
    //   message = '(No properties were provided.)';
    // }

    // Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`).catch(() => {
    //   /* handle error */
    // });

    // Handle possible changes on the existence of placeholders
    this.context.placeholderProvider.changedEvent.add(this, this.renderGlobalNav);

    // Render the navbars
    this.renderGlobalNav();

    return Promise.resolve();
  }

  // Method to render the nav bars
  private renderGlobalNav() {

    // Ensure the header doesn't exist

    if (!this._header) {
    
      // Create the header
      this._header = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);

      // Render the top navbar
      Components.Navbar({
        brand: "Dept Of State - OBO",
        el: this._header.domElement,
        className: "customclass",
        items: [
          { text: "OBO/CFSM", className: "customclass", items: [
              { text: "OBO/CFSM/CM", href: "/" }, 
              { text: "OBO/CFSM/SM" }
            ] 
          },
          { text: "OBO/COMP", className: "customclass", items: [
              { text: "OBO/COMP/FM" }, 
              { text: "OBO/COMP/P" }
            ]
          },
          { text: "OBO/EA", className: "--sp-white" },
          { text: "OBO/EX", className: "--sp-theme-light", items: [
              { text: "OBO/EX/HR" }, 
              { text: "OBO/EX/IRM" },
              { text: "OBO/EX/MSD" }
            ]
          },
          { text: "OBO/EXEC", className: "--sp-white" },
          { text: "OBO/FO", className: "--sp-white" }
        ],
        searchBox: {
          placeholder: "My Custom Search"
        }
      });
    }
  }

}
