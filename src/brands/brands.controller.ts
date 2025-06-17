import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { GetBrandsQueryDto } from './dto/get-brands-query.dto';

@Controller('brands')
@UseInterceptors(ClassSerializerInterceptor)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBrandDto: CreateBrandDto) {
    const brand = await this.brandsService.create(createBrandDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Brand created successfully',
      data: brand,
    };
  }

  @Get()
  async findAll(@Query() query: GetBrandsQueryDto) {
    const result = await this.brandsService.findAll(query);
    return {
      statusCode: HttpStatus.OK,
      message: 'Brands retrieved successfully',
      data: result.data,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const brand = await this.brandsService.findBySlug(slug);
    return {
      statusCode: HttpStatus.OK,
      message: 'Brand retrieved successfully',
      data: brand,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const brand = await this.brandsService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Brand retrieved successfully',
      data: brand,
    };
  }

  @Get(':id/branches')
  async getBranches(@Param('id') id: string) {
    const branches = await this.brandsService.getBranches(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Brand branches retrieved successfully',
      data: branches,
    };
  }

  @Get(':id/menus')
  async getMenus(@Param('id') id: string) {
    const menus = await this.brandsService.getMenus(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Brand menus retrieved successfully',
      data: menus,
    };
  }

  @Get(':id/deals')
  async getPopularDeals(@Param('id') id: string) {
    const deals = await this.brandsService.getPopularDeals(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Brand popular deals retrieved successfully',
      data: deals,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    const brand = await this.brandsService.update(id, updateBrandDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Brand updated successfully',
      data: brand,
    };
  }

  @Patch(':id/follow')
  async followBrand(@Param('id') id: string) {
    const brand = await this.brandsService.incrementFollowerCount(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Brand followed successfully',
      data: {
        brandId: id,
        followerCount: brand.followerCount,
      },
    };
  }

  @Patch(':id/unfollow')
  async unfollowBrand(@Param('id') id: string) {
    const brand = await this.brandsService.decrementFollowerCount(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Brand unfollowed successfully',
      data: {
        brandId: id,
        followerCount: brand.followerCount,
      },
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.brandsService.remove(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Brand deleted successfully',
    };
  }
}
