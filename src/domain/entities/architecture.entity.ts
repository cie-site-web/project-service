export interface ArchitectureProps {
  readonly id?: string;
  publicId: string;
  logique: string;
  physique: string;
  readonly createdAt?: Date;
}

export class ArchitectureEntity {
  constructor(private readonly props: ArchitectureProps) {}

  get id(): string | undefined { return this.props.id; }
  get publicId(): string { return this.props.publicId; }
  get logique(): string { return this.props.logique; }
  get physique(): string { return this.props.physique; }
  get createdAt(): Date | undefined { return this.props.createdAt; }

  update(updates: Partial<ArchitectureProps>): ArchitectureEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
