import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
 
export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @Length(13, 19)
  cardNumber: string;
 
  @IsString()
  @IsNotEmpty()
  @Length(4, 7)
  expirationDate: string;
 
  @IsString()
  @IsNotEmpty()
  @Length(3, 4)
  cvv: string;
 
  @IsNumber()
  @IsPositive()
  amount: number;
 
  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  customerName: string;
}