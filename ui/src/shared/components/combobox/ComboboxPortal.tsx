import { Combobox as BaseCombobox, ComboboxPositionerProps } from '@base-ui/react/combobox';
import cn from 'classnames';

import { ComboboxItem, EmptyComboboxItem } from './ComboboxItem';

import styles from './Combobox.module.css';

const { Portal, Positioner, Popup, List, Empty } = BaseCombobox;

type ComboboxPortalProps = {
  emptyMessage: string;
  positionerAnchor?: ComboboxPositionerProps['anchor'];
};

export const ComboboxPortal = ({ emptyMessage, positionerAnchor }: ComboboxPortalProps) => (
  <Portal>
    <Positioner className={styles.Positioner} sideOffset={5} anchor={positionerAnchor}>
      <Popup className={styles.Popup}>
        <Empty className={cn(styles.Empty, styles.List)}>
          <EmptyComboboxItem emptyMessage={emptyMessage} />
        </Empty>

        <List className={styles.List}>
          {(item) => <ComboboxItem key={item.value} item={item} />}
        </List>
      </Popup>
    </Positioner>
  </Portal>
);
