export interface TechnologyProps {
  readonly id?: string;
  publicId: string;
  architectureId: string;
  frameworkId: string;
  utilsGestionId: string;
  readonly createdAt?: Date;
}

export class TechnologyEntity {
  constructor(private readonly props: TechnologyProps) {}

  get id(): string | undefined {
    return this.props.id;
  }
  get publicId(): string {
    return this.props.publicId;
  }
  get architectureId(): string {
    return this.props.architectureId;
  }
  get frameworkId(): string {
    return this.props.frameworkId;
  }
  get utilsGestionId(): string {
    return this.props.utilsGestionId;
  }
  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  update(updates: Partial<TechnologyProps>): TechnologyEntity {
    Object.assign(this.props, updates);
    return this;
  }
}
