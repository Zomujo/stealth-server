export enum Commands {
  QUERY = '/query',
  LIST = '/list',
  STOCK = '/stock',
}
export class IMSQuery {
  command: Commands; // e.g., 'git'
  argument?: string;
  arguments?: string[]; // e.g., ['hello']
  subcommand?: string; // e.g., 'commit'
  options?: string[]; // e.g., ['-a', '-m']

  constructor(query: string) {
    const match = query.match(/\[([^\]]+)\]/);

    const args = match ? match[1].split(',').map((item) => item.trim()) : [];

    const splitQuery = this.parseCommand(query);
    this.command = splitQuery[0] as Commands;
    this.arguments = args || null;
    this.subcommand = splitQuery[2] || null;
    this.options = this.parseCommand(splitQuery[3]);
  }

  private parseCommand(input: string): string[] {
    if (!input || !input.trim()) return [];

    const trimmed = input.trim();
    return trimmed.includes(' ') ? trimmed.split(/\s+/) : [trimmed];
  }
}
