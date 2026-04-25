export interface DeleteTagCommand {
  publicId: string;
}

export interface DeleteTagInterfacePort {
  execute(command: DeleteTagCommand): Promise<void>;
}
