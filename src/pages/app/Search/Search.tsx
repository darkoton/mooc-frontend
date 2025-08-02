import SearchToolbar from "@widgets/app/SearchToolbar";
import UniversityProgramsSearchResults from "@widgets/universityPrograms/SearchResults";
import CoursesSearchResults from "@widgets/courses/SearchResults";

import s from "./Search.module.scss";

export default function SearchPage() {
  return (
    <div className={s.pageWrapper}>
      <SearchToolbar />

      <main>
        <UniversityProgramsSearchResults />
        <CoursesSearchResults />
      </main>
    </div>
  );
}
