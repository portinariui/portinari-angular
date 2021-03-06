import { Injectable } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Injectable()
export class MenuGuidesService {
  constructor() {}

  getMenus(documentationItems) {
    return new Array<PoMenuItem>(
      { label: 'Guia de implementação de APIs', link: 'guides/api' },
      { label: 'Compatibilidade com os navegadores', link: 'guides/browser-support' },
      { label: 'Depreciações', link: 'guides/deprecations' },
      { label: 'Contribuindo para o PO UI', link: 'guides/development-flow' },
      { label: 'Primeiros passos', link: 'guides/getting-started' },
      { label: 'Guia de uso para Gráficos', link: 'guides/guide-charts' },
      { label: 'Migração do PO UI para V2', link: 'guides/migration-poui-v2' },
      { label: 'Migração do PO UI', link: 'guides/migration-poui' },
      { label: 'Migração do THF para o PO UI v1.x', link: 'guides/migration-thf-to-po-ui' },
      { label: 'Press Kit', link: 'guides/press-kit' },
      { label: 'Releases', link: 'guides/releases' },
      { label: 'Schematics', link: 'guides/schematics' },
      { label: 'Fundamentos do PO Sync', link: 'guides/sync-fundamentals' },
      { label: 'Começando com o PO Sync', link: 'guides/sync-get-started' }
    );
  }
}
