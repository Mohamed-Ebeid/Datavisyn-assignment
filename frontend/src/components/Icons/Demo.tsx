import { IconArrowLeft, IconArrowRight, IconHelpOctagonFilled } from '@tabler/icons-react';

export function Icon1() {
  return (
    <div>
      <IconArrowRight size={20} stroke={1.5} color="red" />
    </div>
  );
}

export function Icon2() {
  return (
    <div>
      <IconArrowLeft size={20} stroke={1.5} color="purple" />
    </div>
  );
}

export function Icon3() {
  return (
    <div>
      <IconHelpOctagonFilled size={20} color="lightblue" />
    </div>
  );
}
