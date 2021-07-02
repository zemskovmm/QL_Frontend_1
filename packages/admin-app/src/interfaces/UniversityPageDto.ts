export interface AdminUniversityPageLanguageDto {
  name: string;
  htmlDescription: string;
  url: string;
}

export interface AdminUniversityItemPostDto {
  foundationYear: number;
  logoId: number | null;
  bannerId: number | null;
  languages: { [lang: string]: AdminUniversityPageLanguageDto };
}

export interface AdminUniversityItemDto {
  id: number;
  website: string;
  minimumAge: number;
  foundationYear: number;
  logoId: number | null;
  bannerId: number | null;
  languages: { [lang: string]: AdminUniversityPageLanguageDto };
  galleryList: (number | string)[];
}
