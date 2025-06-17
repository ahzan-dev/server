import {
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsInt,
  IsUrl,
  IsArray,
  IsDateString,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { BrandCategory, Weekday } from '@prisma/client';

export class CreateContactDetailsDto {
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  email?: string;
}

export class CreateDayHoursDto {
  @IsEnum(Weekday)
  weekday: Weekday;

  @IsBoolean()
  isClosed: boolean;

  @IsOptional()
  @IsString()
  openingTime?: string;

  @IsOptional()
  @IsString()
  closingTime?: string;
}

export class CreateOpeningHoursDto {
  @IsBoolean()
  isSameAllDays: boolean;

  @IsOptional()
  @IsString()
  openingTime?: string;

  @IsOptional()
  @IsString()
  closingTime?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDayHoursDto)
  weeklyHours?: CreateDayHoursDto[];
}

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  distance?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsUrl()
  mapLink?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateOpeningHoursDto)
  openingHours?: CreateOpeningHoursDto;
}

export class CreateMenuDto {
  @IsString()
  menuName: string;

  @IsOptional()
  @IsDateString()
  validUntil?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}

export class CreatePopularDealDto {
  @IsString()
  dealName: string;

  @IsOptional()
  @IsString()
  endsIn?: string;

  @IsString()
  price: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  likes?: number;
}

export class CreateBrandDto {
  @IsString()
  name: string;

  @IsUrl()
  logoUrl: string;

  @IsArray()
  @IsUrl({}, { each: true })
  coverPhotosUrls: string[];

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsEnum(BrandCategory)
  category: BrandCategory;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsBoolean()
  canFollow?: boolean;

  @IsString()
  brandUrlSlug: string;

  @IsString()
  about: string;

  @IsOptional()
  @IsDateString()
  joinedDate?: string;

  @ValidateNested()
  @Type(() => CreateContactDetailsDto)
  contactDetails: CreateContactDetailsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateOpeningHoursDto)
  openingHours?: CreateOpeningHoursDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBranchDto)
  branches?: CreateBranchDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMenuDto)
  menus?: CreateMenuDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePopularDealDto)
  popularDeals?: CreatePopularDealDto[];
}
