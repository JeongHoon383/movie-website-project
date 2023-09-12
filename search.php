<?php include "header.php" ?>
<script src="./js/search.js" type="module"></script>
<figure class="slide"><!-- 동적생성 --></figure>

<main class="search-content">
  <form class="search-form"> <!-- 무한스크롤 면접시 물어봄 -->
    <fieldset class="search-keyword"> <!-- form 안에있는 태그는 fieldset 으로 권장사항 -->
      <span class="search-icon">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
      <input list="keyword-list" class="search-input" type="text" placeholder="영화제목을 입력하세요">
      <datalist id="keyword-list">
        <!-- option 동적 생성 -->
      </datalist>
      <button class="delete-btn" title="검색기록삭제" type="button">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </fieldset><!-- search-form -->

    <fieldset class="genres-btns">
      
    </fieldset>



  </form>

  <section class="common-section movie-grid-section wrap-section search-result-section">
    <h2>
      <i class="fa-solid fa-square-poll-vertical"></i>
      <em>검색결과</em>
    </h2>
    <div class="grid-container">
      <!-- 검색결과 동적 생성 -->
    </div>
  </section>
</main><!-- search-content -->
<div class="trigger"></div>

<?php include "footer.php" ?>