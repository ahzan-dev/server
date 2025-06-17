import { Brand } from '../entities/brand.entity';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { GetBrandsQueryDto } from '../dto/get-brands-query.dto';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IBrandRepository {
  create(createBrandDto: CreateBrandDto): Promise<Brand>;
  findAll(query: GetBrandsQueryDto): Promise<PaginatedResult<Brand>>;
  findOne(id: string): Promise<Brand | null>;
  findBySlug(slug: string): Promise<Brand | null>;
  update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand>;
  remove(id: string): Promise<void>;
  getBranches(brandId: string): Promise<any[]>;
  getMenus(brandId: string): Promise<any[]>;
  getPopularDeals(brandId: string): Promise<any[]>;
}
