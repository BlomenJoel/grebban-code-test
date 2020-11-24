<template>
  <div :class="{ shake: invalidMove }" class="pa-4">
    <h1>Joels 15-pussel!</h1>
    <p>Bestäm antal rader och kolumner</p>
    <div class="d-flex input--position-size">
      <v-text-field
        class="pr-5"
        label="Antal kolumner"
        :value="columns"
        @change="(val) => validate(val, 'columns')"
      />
      <v-text-field
        class="pr-5"
        label="Antal rader"
        :value="rows"
        @change="(val) => validate(val, 'rows')"
      />
    </div>
    <transition-group
      name="cell"
      tag="div"
      class="frame"
      :style="{ width: width }"
    >
      <div v-for="(piece, index) in pieces" :key="piece.number" class="cell">
        <piece
          :key="piece.number"
          :piece="piece"
          @clicked="(piece) => clickedPiece(piece, index)"
        />
      </div>
    </transition-group>
    <v-btn class="mt-5" @click="setPieces(columns * rows)">Shuffle</v-btn>
    <feedback
      v-if="feedback"
      :feedback="feedback"
      @clicked-close="feedback = undefined"
      @clicked-play-again="
        feedback = undefined;
        setPieces(columns * rows);
      "
    />
  </div>
</template>

<script>
  import Piece from "./Game/Piece.vue";
  import {
    allowedMove,
    checkWin,
    createPieces,
    shuffle,
  } from "../service/helpers";
  import Feedback from "./Game/Feedback.vue";

  export default {
    components: {
      Piece,
      Feedback,
    },
    data() {
      return {
        pieces: createPieces(9),
        columns: 3,
        rows: 3,
        picked: undefined,
        feedback: undefined,
        totalLength: 9,
        invalidMove: false,
      };
    },
    computed: {
      width() {
        const length =
          this.columns > 2 ? this.columns * 55.34 : this.columns * 58;
        return `${length}px`;
      },
    },
    methods: {
      createPieces,
      shuffle,
      validate(val, key) {
        const mobile = this.$vuetify.breakpoint.smAndDown;

        if (val > 15) {
          this.feedback = {
            title: "Invalid number of columns/rows",
            message:
              "I limted how many columns/rows you can have so the site doesnt crash when you enter an enormous number",
          };
          this.setVal(15, "columns");
        } else if (mobile && val > 6 && key === "columns") {
          this.feedback = {
            title: "Invalid number of columns",
            message: "The highest amount of columns are six for mobile",
          };
          this.setVal(6, "columns");
        } else if (val < 2) {
          this.feedback = {
            title: "Invalid number of rows/columns",
            message: "The lowest amount of rows/columns are two",
          };
          this.setVal(2, key);
        } else {
          this.setVal(val, key);
        }
      },
      setVal(val, key) {
        switch (key) {
          case "columns": {
            this.columns = parseInt(val);
            return;
          }
          case "rows": {
            this.rows = parseInt(val);
            return;
          }
        }
      },
      clickedPiece(piece, index) {
        this.invalidMove = false;

        if (this.isNumberedPiece(piece)) {
          this.picked = { number: piece.number, index };
        } else if (
          this.picked &&
          allowedMove(index, this.picked, this.rows, this.columns)
        ) {
          this.pieces.splice(index, 1, { number: this.picked.number }); //insert the "picked" piece, and remove "empty"
          this.pieces.splice(this.picked.index, 1, piece); //insert "empty" at where picked used to be

          if (checkWin(this.pieces)) {
            this.feedback = {
              title: "You won!",
              message: "That was a hard one, wanna try it again?",
              won: true,
            };
          }
        } else if (
          !this.picked ||
          !allowedMove(index, this.picked, this.rows, this.columns)
        ) {
          this.invalidMove = true;
        }
      },
      isNumberedPiece(piece) {
        return !!piece.number;
      },
      setPieces(total) {
        const orderdPieces = createPieces(total);
        this.pieces = shuffle(orderdPieces);
      },
    },
    watch: {
      columns(newVal) {
        this.setPieces(newVal * this.rows);
      },
      rows(newVal) {
        this.setPieces(newVal * this.columns);
      },
    },
  };
</script>

<style scoped>
  .input--position-size {
    max-width: 500px;
  }
</style>
