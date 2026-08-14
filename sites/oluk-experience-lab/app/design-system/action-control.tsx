import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { classes } from "./component-utils";
import styles from "./action-control.module.css";

export type ActionVariant = "primary" | "secondary" | "quiet";
export type ActionSize = "default" | "compact";

type SharedActionProps = Readonly<{
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  leadingIcon?: ReactNode;
  pending?: boolean;
  pendingLabel?: string;
  size?: ActionSize;
  trailingIcon?: ReactNode;
  variant?: ActionVariant;
}>;

export type ActionLinkProps = SharedActionProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "aria-disabled" | "children" | "className" | "href" | "onClick"> &
  Readonly<{
    href: string;
    /** Compatibility with the pre-foundation ActionLink API. */
    secondary?: boolean;
  }>;

export type ActionButtonProps = SharedActionProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "disabled">;

type ActionControlProps =
  | (ActionLinkProps & Readonly<{ as: "link" }>)
  | (ActionButtonProps & Readonly<{ as?: "button" }>);

function ArrowIcon() {
  return <span aria-hidden="true">→</span>;
}

function PendingIndicator() {
  return <span aria-hidden="true" className={styles.pendingIndicator} />;
}

function actionClassName({
  className,
  size = "default",
  variant = "primary",
}: Pick<SharedActionProps, "className" | "size" | "variant">) {
  return classes(
    styles.control,
    styles[variant],
    styles[size],
    className,
  );
}

function ActionContents({
  children,
  leadingIcon,
  pending = false,
  pendingLabel = "Working…",
  trailingIcon,
}: Pick<SharedActionProps, "children" | "leadingIcon" | "pending" | "pendingLabel" | "trailingIcon">) {
  return (
    <>
      {pending ? <PendingIndicator /> : leadingIcon ? <span className={styles.icon}>{leadingIcon}</span> : null}
      <span className={styles.label}>{pending ? pendingLabel : children}</span>
      {!pending && trailingIcon ? <span className={styles.icon}>{trailingIcon}</span> : null}
    </>
  );
}

export function ActionControl(props: ActionControlProps) {
  if (props.as === "link") {
    const {
      as: _as,
      children,
      className,
      disabled = false,
      href,
      leadingIcon,
      pending = false,
      pendingLabel,
      secondary = false,
      size,
      trailingIcon,
      variant = secondary ? "secondary" : "primary",
      ...anchorProps
    } = props;
    void _as;
    const unavailable = disabled || pending;
    return (
      <a
        {...anchorProps}
        aria-busy={pending || undefined}
        aria-disabled={unavailable || undefined}
        className={actionClassName({ className, size, variant })}
        data-component="Button"
        data-control-kind="link"
        data-figma-intent-source="1337:8963"
        data-state={pending ? "pending" : unavailable ? "disabled" : "default"}
        data-variant={variant}
        href={unavailable ? undefined : href}
        tabIndex={unavailable ? -1 : anchorProps.tabIndex}
      >
        <ActionContents
          leadingIcon={leadingIcon}
          pending={pending}
          pendingLabel={pendingLabel}
          trailingIcon={unavailable ? undefined : trailingIcon}
        >
          {children}
        </ActionContents>
      </a>
    );
  }

  const {
    as: _as,
    children,
    className,
    disabled = false,
    leadingIcon,
    pending = false,
    pendingLabel,
    size,
    trailingIcon,
    type = "button",
    variant = "primary",
    ...buttonProps
  } = props;
  void _as;
  const unavailable = disabled || pending;

  return (
    <button
      {...buttonProps}
      aria-busy={pending || undefined}
      className={actionClassName({ className, size, variant })}
      data-component="Button"
      data-control-kind="button"
      data-figma-intent-source="1337:8963"
      data-state={pending ? "pending" : unavailable ? "disabled" : buttonProps["aria-pressed"] ? "selected" : "default"}
      data-variant={variant}
      disabled={unavailable}
      type={type}
    >
      <ActionContents
        leadingIcon={leadingIcon}
        pending={pending}
        pendingLabel={pendingLabel}
        trailingIcon={trailingIcon}
      >
        {children}
      </ActionContents>
    </button>
  );
}

export function ActionLink({ trailingIcon = <ArrowIcon />, ...props }: ActionLinkProps) {
  return <ActionControl {...props} as="link" trailingIcon={trailingIcon} />;
}

export function ActionButton(props: ActionButtonProps) {
  return <ActionControl {...props} as="button" />;
}
