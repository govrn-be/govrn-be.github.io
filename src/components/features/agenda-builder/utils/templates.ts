```typescript
import type { Template, AgendaItem } from '../types';

export function applyTemplate(template: Template): AgendaItem[] {
  return template.items.map(item => ({
    ...item,
    id: generateId(),
    documents: [],
    subItems: []
  }));
}

export function customizeTemplate(
  template: Template,
  customizations: Partial<Template>
): Template {
  return {
    ...template,
    ...customizations,
    items: template.items.map((item, index) => ({
      ...item,
      ...(customizations.items?.[index] || {})
    }))
  };
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
```