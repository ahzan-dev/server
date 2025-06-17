import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { GetBrandsQueryDto } from './dto/get-brands-query.dto';
import {
  IBrandRepository,
  PaginatedResult,
} from './interfaces/brand-repository.interface';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @Inject('IBrandRepository')
    private readonly brandRepository: IBrandRepository,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      // Check if brand slug already exists
      const existingBrand = await this.brandRepository.findBySlug(
        createBrandDto.brandUrlSlug,
      );
      if (existingBrand) {
        throw new BadRequestException(
          `Brand with slug '${createBrandDto.brandUrlSlug}' already exists`,
        );
      }

      return await this.brandRepository.create(createBrandDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create brand');
    }
  }

  async findAll(query: GetBrandsQueryDto): Promise<PaginatedResult<Brand>> {
    return await this.brandRepository.findAll(query);
  }

  async findOne(id: string): Promise<Brand> {
    const brand = await this.brandRepository.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with ID '${id}' not found`);
    }
    return brand;
  }

  async findBySlug(slug: string): Promise<Brand> {
    const brand = await this.brandRepository.findBySlug(slug);
    if (!brand) {
      throw new NotFoundException(`Brand with slug '${slug}' not found`);
    }
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    try {
      // Check if brand exists
      await this.findOne(id);

      // If updating slug, check it's not already taken by another brand
      if (updateBrandDto.brandUrlSlug) {
        const existingBrand = await this.brandRepository.findBySlug(
          updateBrandDto.brandUrlSlug,
        );
        if (existingBrand && existingBrand.id !== id) {
          throw new BadRequestException(
            `Brand with slug '${updateBrandDto.brandUrlSlug}' already exists`,
          );
        }
      }

      return await this.brandRepository.update(id, updateBrandDto);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to update brand');
    }
  }

  async remove(id: string): Promise<void> {
    // Check if brand exists
    await this.findOne(id);

    try {
      await this.brandRepository.remove(id);
    } catch (error) {
      throw new BadRequestException('Failed to delete brand');
    }
  }

  async getBranches(id: string): Promise<any[]> {
    // Check if brand exists
    await this.findOne(id);

    return await this.brandRepository.getBranches(id);
  }

  async getMenus(id: string): Promise<any[]> {
    // Check if brand exists
    await this.findOne(id);

    return await this.brandRepository.getMenus(id);
  }

  async getPopularDeals(id: string): Promise<any[]> {
    // Check if brand exists
    await this.findOne(id);

    return await this.brandRepository.getPopularDeals(id);
  }

  // Utility methods for managing brand metrics
  async incrementFollowerCount(id: string): Promise<Brand> {
    const brand = await this.findOne(id);
    return await this.brandRepository.update(id, {
      followerCount: brand.followerCount + 1,
    });
  }

  async decrementFollowerCount(id: string): Promise<Brand> {
    const brand = await this.findOne(id);
    const newCount = Math.max(0, brand.followerCount - 1);
    return await this.brandRepository.update(id, {
      followerCount: newCount,
    });
  }

  async updateBranchCount(id: string): Promise<Brand> {
    const branches = await this.getBranches(id);
    return await this.brandRepository.update(id, {
      branchCount: branches.length,
    });
  }
}
