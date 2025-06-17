import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { GetBrandsQueryDto } from '../dto/get-brands-query.dto';
import {
  IBrandRepository,
  PaginatedResult,
} from '../interfaces/brand-repository.interface';

@Injectable()
export class MockBrandRepository implements IBrandRepository {
  private brands: Brand[] = this.initializeMockData();

  private initializeMockData(): Brand[] {
    return [
      {
        id: 'brand_001',
        name: "McDonald's",
        logoUrl: 'https://example.com/logos/mcdonalds.png',
        coverPhotosUrls: [
          'https://example.com/covers/mcdonalds1.jpg',
          'https://example.com/covers/mcdonalds2.jpg',
        ],
        isVerified: true,
        category: 'RESTAURANT' as any,
        tag: 'Fast Food',
        canFollow: true,
        followerCount: 15420,
        branchCount: 3,
        brandUrlSlug: 'mcdonalds',
        about: 'Global fast food icon serving burgers, fries, and more.',
        joinedDate: new Date('2023-06-11T00:00:00.000Z'),
        contactDetails: {
          phoneNumber: '+94112345678',
          website: 'https://www.mcdonalds.lk',
          whatsapp: '+94712345678',
          email: 'contact@mcdonalds.lk',
        },
        openingHours: {
          id: 'hours_001',
          isSameAllDays: false,
          weeklyHours: [
            {
              id: 'day_001',
              weekday: 'MONDAY' as any,
              isClosed: false,
              openingTime: '08:00',
              closingTime: '23:00',
            },
            {
              id: 'day_002',
              weekday: 'TUESDAY' as any,
              isClosed: false,
              openingTime: '08:00',
              closingTime: '23:00',
            },
            {
              id: 'day_003',
              weekday: 'WEDNESDAY' as any,
              isClosed: false,
              openingTime: '08:00',
              closingTime: '23:00',
            },
            {
              id: 'day_004',
              weekday: 'THURSDAY' as any,
              isClosed: false,
              openingTime: '08:00',
              closingTime: '23:00',
            },
            {
              id: 'day_005',
              weekday: 'FRIDAY' as any,
              isClosed: false,
              openingTime: '08:00',
              closingTime: '23:00',
            },
            {
              id: 'day_006',
              weekday: 'SATURDAY' as any,
              isClosed: false,
              openingTime: '08:00',
              closingTime: '18:00',
            },
            { id: 'day_007', weekday: 'SUNDAY' as any, isClosed: true },
          ],
        },
        branches: [
          {
            id: 'branch_001',
            name: 'Kalutara',
            address: '123, Main St, Kalutara',
            distance: '~2.5Km away',
            imageUrl: 'https://example.com/branches/kalutara.jpg',
            mapLink: 'https://maps.google.com/?q=kalutara+mcdonalds',
            openingHours: {
              id: 'hours_002',
              isSameAllDays: true,
              openingTime: '08:00',
              closingTime: '22:00',
            },
          },
        ],
        menus: [
          {
            id: 'menu_001',
            menuName: 'Regular Menu',
            validUntil: new Date('2025-12-31T00:00:00.000Z'),
            imageUrl: 'https://example.com/menus/regular.jpg',
          },
        ],
        popularDeals: [
          {
            id: 'deal_001',
            dealName: '30% off on your Big Mac Family Dinner',
            endsIn: '2d 15h',
            price: '1580',
            imageUrl: 'https://example.com/deals/bigmac.jpg',
            likes: 245,
          },
        ],
        createdAt: new Date('2023-06-11T10:30:00.000Z'),
        updatedAt: new Date('2024-12-15T14:22:00.000Z'),
      },
      {
        id: 'brand_002',
        name: 'KFC',
        logoUrl: 'https://example.com/logos/kfc.png',
        coverPhotosUrls: [
          'https://example.com/covers/kfc1.jpg',
          'https://example.com/covers/kfc2.jpg',
        ],
        isVerified: true,
        category: 'RESTAURANT' as any,
        tag: 'Fried Chicken',
        canFollow: true,
        followerCount: 12890,
        branchCount: 2,
        brandUrlSlug: 'kfc',
        about:
          'Kentucky Fried Chicken, known worldwide for our Original Recipe fried chicken.',
        joinedDate: new Date('2023-08-20T00:00:00.000Z'),
        contactDetails: {
          phoneNumber: '+94112567890',
          website: 'https://www.kfc.lk',
          whatsapp: '+94712567890',
          email: 'info@kfc.lk',
        },
        openingHours: {
          id: 'hours_004',
          isSameAllDays: true,
          openingTime: '10:00',
          closingTime: '22:00',
        },
        branches: [
          {
            id: 'branch_004',
            name: 'Nugegoda',
            address: 'High Level Rd, Nugegoda',
            distance: '~5.2Km away',
            imageUrl: 'https://example.com/branches/nugegoda-kfc.jpg',
            mapLink: 'https://maps.google.com/?q=nugegoda+kfc',
          },
        ],
        menus: [
          {
            id: 'menu_003',
            menuName: 'Original Recipe Menu',
            imageUrl: 'https://example.com/menus/kfc-original.jpg',
          },
        ],
        popularDeals: [
          {
            id: 'deal_004',
            dealName: 'Family Feast - 8 pieces + 2 sides',
            endsIn: '3d 10h',
            price: '2850',
            imageUrl: 'https://example.com/deals/family-feast.jpg',
            likes: 312,
          },
        ],
        createdAt: new Date('2023-08-20T09:15:00.000Z'),
        updatedAt: new Date('2024-12-14T16:45:00.000Z'),
      },
    ];
  }

  private generateId(): string {
    return `brand_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const newBrand: Brand = {
      id: this.generateId(),
      name: createBrandDto.name,
      logoUrl: createBrandDto.logoUrl,
      coverPhotosUrls: createBrandDto.coverPhotosUrls,
      isVerified: createBrandDto.isVerified || false,
      category: createBrandDto.category,
      tag: createBrandDto.tag,
      canFollow: createBrandDto.canFollow || true,
      followerCount: 0,
      branchCount: createBrandDto.branches?.length || 0,
      brandUrlSlug: createBrandDto.brandUrlSlug,
      about: createBrandDto.about,
      joinedDate: createBrandDto.joinedDate
        ? new Date(createBrandDto.joinedDate)
        : new Date(),
      contactDetails: createBrandDto.contactDetails,
      openingHours: createBrandDto.openingHours
        ? {
            id: `hours_${Date.now()}`,
            ...createBrandDto.openingHours,
            weeklyHours: createBrandDto.openingHours.weeklyHours?.map(
              (day) => ({
                id: `day_${Date.now()}_${Math.random()}`,
                ...day,
              }),
            ),
          }
        : undefined,
      branches:
        createBrandDto.branches?.map((branch) => ({
          id: `branch_${Date.now()}_${Math.random()}`,
          ...branch,
          openingHours: branch.openingHours
            ? {
                id: `hours_${Date.now()}_${Math.random()}`,
                ...branch.openingHours,
                weeklyHours: branch.openingHours.weeklyHours?.map((day) => ({
                  id: `day_${Date.now()}_${Math.random()}`,
                  ...day,
                })),
              }
            : undefined,
        })) || [],
      menus:
        createBrandDto.menus?.map((menu) => ({
          id: `menu_${Date.now()}_${Math.random()}`,
          ...menu,
          validUntil: menu.validUntil ? new Date(menu.validUntil) : undefined,
        })) || [],
      popularDeals:
        createBrandDto.popularDeals?.map((deal) => ({
          id: `deal_${Date.now()}_${Math.random()}`,
          likes: deal.likes || 0,
          ...deal,
        })) || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.brands.push(newBrand);
    return newBrand;
  }

  async findAll(query: GetBrandsQueryDto): Promise<PaginatedResult<Brand>> {
    let filteredBrands = [...this.brands];

    // Apply filters
    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredBrands = filteredBrands.filter(
        (brand) =>
          brand.name.toLowerCase().includes(searchLower) ||
          brand.about.toLowerCase().includes(searchLower) ||
          brand.tag?.toLowerCase().includes(searchLower),
      );
    }

    if (query.category) {
      filteredBrands = filteredBrands.filter(
        (brand) => brand.category === query.category,
      );
    }

    if (query.tag) {
      filteredBrands = filteredBrands.filter(
        (brand) => brand.tag === query.tag,
      );
    }

    if (query.isVerified !== undefined) {
      filteredBrands = filteredBrands.filter(
        (brand) => brand.isVerified === query.isVerified,
      );
    }

    // Apply sorting
    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder || 'desc';

    filteredBrands.sort((a, b) => {
      let aValue = a[sortBy as keyof Brand];
      let bValue = b[sortBy as keyof Brand];

      if (!aValue && !bValue) return 0;
      if (!aValue) return 1;
      if (!bValue) return -1;

      if (aValue instanceof Date) aValue = aValue.getTime();
      if (bValue instanceof Date) bValue = bValue.getTime();

      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Apply pagination
    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedBrands = filteredBrands.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredBrands.length / limit);

    return {
      data: paginatedBrands,
      total: filteredBrands.length,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: string): Promise<Brand | null> {
    return this.brands.find((brand) => brand.id === id) || null;
  }

  async findBySlug(slug: string): Promise<Brand | null> {
    return this.brands.find((brand) => brand.brandUrlSlug === slug) || null;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brandIndex = this.brands.findIndex((brand) => brand.id === id);
    if (brandIndex === -1) {
      throw new Error('Brand not found');
    }

    const currentBrand = this.brands[brandIndex];
    const updatedBrand: Brand = {
      ...currentBrand,
      ...updateBrandDto,
      id: currentBrand.id, // Preserve the original ID
      joinedDate: updateBrandDto.joinedDate
        ? new Date(updateBrandDto.joinedDate)
        : currentBrand.joinedDate,
      updatedAt: new Date(),
      // Preserve existing relations if not updated
      contactDetails:
        updateBrandDto.contactDetails || currentBrand.contactDetails,
      openingHours: currentBrand.openingHours, // Keep existing opening hours structure
      branches: currentBrand.branches, // Keep existing branches
      menus: currentBrand.menus, // Keep existing menus
      popularDeals: currentBrand.popularDeals, // Keep existing deals
    };

    // Update branch count if branches are provided
    if (updateBrandDto.branches) {
      updatedBrand.branchCount = updateBrandDto.branches.length;
    }

    this.brands[brandIndex] = updatedBrand;
    return updatedBrand;
  }

  async remove(id: string): Promise<void> {
    const brandIndex = this.brands.findIndex((brand) => brand.id === id);
    if (brandIndex === -1) {
      throw new Error('Brand not found');
    }
    this.brands.splice(brandIndex, 1);
  }

  async getBranches(brandId: string): Promise<any[]> {
    const brand = await this.findOne(brandId);
    return brand?.branches || [];
  }

  async getMenus(brandId: string): Promise<any[]> {
    const brand = await this.findOne(brandId);
    return brand?.menus || [];
  }

  async getPopularDeals(brandId: string): Promise<any[]> {
    const brand = await this.findOne(brandId);
    return brand?.popularDeals || [];
  }
}
