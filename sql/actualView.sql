create definer = root@localhost view main_view as

SELECT
    exclusive.posts.*,
    featured_image.featured_image AS featured_image,
    gallery.gallery AS gallery,
    exclusive.categories.title_am AS cat_title_am,
    exclusive.categories.title_en AS cat_title_en,
    exclusive.categories.title_ru AS cat_title_ru,
    exclusive.users.name_am AS user_name_am,
    exclusive.users.lastName_am AS user_lastName_am,
     exclusive.users.name_ru AS user_name_ru,
    exclusive.users.lastName_ru AS user_lastName_ru,
     exclusive.users.name_en AS user_name_en,
    exclusive.users.lastName_en AS user_lastName_en,
    exclusive.users.nickname_am AS user_nicname_am,
    exclusive.users.nickname_ru AS user_nicname_ru,
    exclusive.users.nickname_en AS user_nicname_en,

    exclusive.users.image AS user_image_url
FROM
    (
     (
         (
             (
                 exclusive.posts
                     LEFT JOIN exclusive.categories ON
                     (
                         (
                                 exclusive.posts.cat_id = exclusive.categories.id
                             )
                         )
                 )
                 LEFT JOIN exclusive.users ON
                 (
                     (
                             exclusive.posts.user = exclusive.users.id
                         )
                     )
             )
             LEFT JOIN(
             SELECT
                 exclusive.images.id AS id,
                 JSON_OBJECT(
                         'image_id',
                         exclusive.images.id,
                         'image_alt',
                         exclusive.images.image_alt,
                         'image_path',
                         exclusive.images.image_path
                     ) AS featured_image
             FROM
                 exclusive.images
         ) featured_image
             ON
                (exclusive.posts.image_id = featured_image.id)
         )
        LEFT JOIN(
        SELECT
            exclusive.posts_images.post_id AS post_id,
            json_arrayagg(
                    JSON_OBJECT(
                            'image_id',
                            exclusive.images.id,
                            'image_alt',
                            exclusive.images.image_alt,
                            'image_path',
                            exclusive.images.image_path
                        )
                ) AS gallery
        FROM
            (
             exclusive.posts_images
                JOIN exclusive.images ON
                (exclusive.images.id = exclusive.posts_images.image_id)
                )
        GROUP BY
            exclusive.posts_images.post_id
    ) gallery
                 ON(gallery.post_id = exclusive.posts.id) )
