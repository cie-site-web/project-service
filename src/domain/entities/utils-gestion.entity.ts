export interface UtilsGestionProps {
  readonly id?: string;
  publicId: string;
  projectId: string;
  versioning: string;
  container: string;
  orchestrateur: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class UtilsGestionEntity {
  constructor(private readonly props: UtilsGestionProps) {}

  get id(): string | undefined { return this.props.id; }
  get publicId(): string { return this.props.publicId; }
  get projectId(): string { return this.props.projectId; }
  get versioning(): string { return this.props.versioning; }
  get container(): string { return this.props.container; }
  get orchestrateur(): string { return this.props.orchestrateur; }
  get createdAt(): Date | undefined { return this.props.createdAt; }
  get updatedAt(): Date | undefined { return this.props.updatedAt; }

  update(updates: Partial<UtilsGestionProps>): UtilsGestionEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
