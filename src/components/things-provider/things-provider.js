import { PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReferenceMap, create, error } from '@hatiolab/things-scene';

class ThingsProvider extends PolymerElement {

  static get is() { return 'things-provider'; }

  static get properties() {
    return {
      refProvider: {
        notify: true
      }
    }
  }

  ready() {
    this.refProvider = new ReferenceMap(

      async (boardId, resolve, reject) => {

        const url = `api/board/${boardId}`;

        try {
          const response = await fetch(url);
          const board = await response.json();
          const { model } = board;
          var scene;

          try {
            scene = await this.refProvider.get(boardId);
            console.warn("Board fetched more than twice.", boardId);

          } catch (e) {
            scene = create({
              model,
              mode: 0,
              refProvider: this.refProvider
            });

            // s.app.baseUrl = undefined;
          }

          resolve(scene, board);

        } catch (e) {
          error(e);
          reject(e);
        }

      }, async (id, ref) => {

        ref.dispose();
      }
    )

    window.provider = this.refProvider;
  }
}

customElements.define(ThingsProvider.is, ThingsProvider);
