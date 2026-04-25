export interface FrameworkProps {
  readonly id?: string;
  publicId: string;
  programmingLangageId: string;
  name: string;
  progress: number;
  readonly createdAt?: Date;
}

export class FrameworkEntity {
  constructor(private readonly props: FrameworkProps) {}

  get id(): string | undefined { return this.props.id; }
  get publicId(): string { return this.props.publicId; }
  get programmingLangageId(): string { return this.props.programmingLangageId; }
  get name(): string { return this.props.name; }
  get progress(): number { return this.props.progress; }
  get createdAt(): Date | undefined { return this.props.createdAt; }

  update(updates: Partial<FrameworkProps>): FrameworkEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
