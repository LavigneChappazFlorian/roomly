<script lang="ts">

type MessageProps = {
        username: string;
        message: string;
        createdAt: string | Date;
    };

    let { username, message, createdAt }: MessageProps = $props();

</script>

<article class="message">
    <header class="message_header">
        <strong>{username}</strong>
        <p>{createdAt}</p>
    </header>

    <p>{message}</p>
</article>

<style lang="scss">
    .message {
        padding: 0.75rem 0;
        color: $font-color;

        &_header {
            display: flex;
            align-items: baseline;
            gap: 0.75rem;
            margin-bottom: 0.4rem;

            strong {
                color: $secondary-color;
                font-weight: 600;
            }

            p {
                color: $primary-color;
                font-size: 0.8rem;
            }
        }

        p {
            line-height: 1.4;
            white-space: pre-wrap;
        }
    }
</style>