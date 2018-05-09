import * as React from 'react';

export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export function ConfigWrapper<T>(
  props: { [P in keyof T]: T[P] } & { component: React.ComponentType<T> },
) {
  /**
   * as any is not avoidable.
   * @see https://github.com/Microsoft/TypeScript/pull/13288
   */
  const { component: _, ...otherProps } = props as any;
  return <props.component {...otherProps} />;
}

export type GetProps<P extends React.ComponentType<any>> = P extends React.ComponentType<infer Q>
  ? Q
  : {};
