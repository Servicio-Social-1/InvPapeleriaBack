import { Cell } from './cell.interface';

export interface TextCell extends Pick<Cell, 'doc' | 'x' | 'y'> {
    text: string;
    fontSize?: number;
    width?: number;
    font?: 'Times-Roman' | 'Times-Bold' | 'Sans-Pro' | 'Sans-Pro-Bold' ;
}
