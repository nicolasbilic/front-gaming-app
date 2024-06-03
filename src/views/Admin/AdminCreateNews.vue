<template>
  <div>

  </div>
</template>

<script setup lang="ts"></script>
<style></style>

<!-- via url /admin/news/create -->
<!-- <template>
  <div>
    <form @submit.prevent="submitForm" action="">
    <input v-model="form.content" type="text">
    <section v-if="editor" class="editor-buttons">
      <button @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        <BoldIcon title="Gras" />
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }">
        <ItalicIcon title="italique" />
      </button>
      <button @click="editor.chain().focus().toggleUnderline().run()"
        :disabled="!editor.can().chain().focus().toggleUnderline().run()"
        :class="{ 'is-active': editor.isActive('underline') }">
        <UnderlineIcon title="souligner" />
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        <H1Icon title="Titre 1" />
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        <H2Icon title="Titre 2" />
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }">
        <FormatListBulletedIcon title="Liste à puces" />
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }">
        <FormatListNumberedIcon title="Liste numérotée" />
      </button>
      <button @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }">
        <FormatQuoteCloseIcon title="Citation" />
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }">
        <CodeBlockIcon title="Bloc de code" />
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        <HorizontalRuleIcon title="séparateur horizontal" />
      </button>
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
        <UndoIcon title="Revenir en arrière" />
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        <RedoIcon title="Revenir en avant" />
      </button>
    </section>
    <EditorContent :editor="editor" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import BoldIcon from 'vue-material-design-icons/FormatBold.vue';
import ItalicIcon from 'vue-material-design-icons/FormatItalic.vue';
import UnderlineIcon from 'vue-material-design-icons/FormatUnderline.vue';
import H1Icon from 'vue-material-design-icons/FormatSize.vue';
import H2Icon from 'vue-material-design-icons/FormatSize.vue';
import FormatListBulletedIcon from 'vue-material-design-icons/FormatListBulleted.vue';
import FormatListNumberedIcon from 'vue-material-design-icons/FormatListNumbered.vue';
import FormatQuoteCloseIcon from 'vue-material-design-icons/FormatQuoteClose.vue';
import CodeBlockIcon from 'vue-material-design-icons/CodeTags.vue';
import HorizontalRuleIcon from 'vue-material-design-icons/Minus.vue';
import UndoIcon from 'vue-material-design-icons/Undo.vue';
import RedoIcon from 'vue-material-design-icons/Redo.vue';



const editor: any = useEditor({
  editorProps: {
    attributes: {
      class: '',
    },
  },
  content: '<p>Mon actualité est...</p>',
  extensions: [
    StarterKit,
    Underline,
  ],
});

</script>

<style scoped lang="scss">
/*::v-deep est un sélecteur qui cible des éléments enfants de composants (ici EditorContent). La portée locale <style scoped> n'autorise pas de cibler ses éléments enfants.*/
:deep(.tiptap) {
  border: 3px solid grey;
  padding: 10px;
  background-color: lightgray;
  min-height: 400px;
  max-height: 400px;
  overflow-y: auto;
  outline: none;

  ul {
    padding-left: 40px;

    li {
      list-style-type: disc;
    }
  }

  ol {
    li {
      list-style-type: decimal;
    }
  }
}

.editor-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0 10px;
  border: 3px solid grey;
  border-bottom: 0px;
  padding: 10px;
  background-color: lightgray;

  button {
    padding: 5px;
    cursor: pointer;

    span {
      display: flex;
      align-items: center;
      color: #374151;
    }
  }
}



.is-active {
  background-color: rgb(192, 192, 192);

}
</style> -->