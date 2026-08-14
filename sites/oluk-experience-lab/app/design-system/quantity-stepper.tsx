import { classes } from "./component-utils";
import styles from "./quantity-stepper.module.css";

export type QuantityStepperProps = Readonly<{
  value?: number;
  unavailable?: boolean;
  className?: string;
}>;

/**
 * Presentation-only quantity selector.
 *
 * The segmented minus/value/plus geometry is a named control exception and is
 * deliberately not composed from ActionControl. Live quantity mutation remains
 * outside this Sites candidate, so both step controls stay disabled.
 */
export function QuantityStepper({
  value = 1,
  unavailable = false,
  className,
}: QuantityStepperProps) {
  return (
    <div
      aria-disabled={unavailable || undefined}
      aria-label="Quantity"
      className={classes(styles.stepper, className)}
      data-behavior="static-presentation"
      data-component="QuantityStepper"
      data-control-exception="segmented-quantity-control"
      data-state={unavailable ? "unavailable" : "default"}
      role="group"
    >
      <button aria-label="Decrease quantity" disabled type="button">
        −
      </button>
      <output aria-label="Current quantity">{value}</output>
      <button aria-label="Increase quantity" disabled type="button">
        +
      </button>
    </div>
  );
}
