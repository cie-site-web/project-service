export interface ProgrammingLangageProps {
  readonly id?: string;
  publicId: string;
  name: string;
  readonly createdAt?: Date;
}

export class ProgrammingLangageEntity {
  constructor(private readonly props: ProgrammingLangageProps) {}

  get id(): string | undefined { return this.props.id; }
  get publicId(): string { return this.props.publicId; }
  get name(): string { return this.props.name; }
  get createdAt(): Date | undefined { return this.props.createdAt; }

  update(updates: Partial<ProgrammingLangageProps>): ProgrammingLangageEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
